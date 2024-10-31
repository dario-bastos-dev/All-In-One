import { PrismaClient, Prisma } from "@prisma/client";
import {
  InterfaceUser,
  InterfaceUserBody,
} from "../@types/interfaces/interfaces";
import validator from "validator";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export default class User {
  private _user: InterfaceUser | null;
  private _error: Array<string>;
  private _body: InterfaceUserBody;

  constructor(body: InterfaceUserBody) {
    this._user = null;
    this._error = [];
    this._body = body;
  }

  // Funçòes para acessar os valores da classe
  public get user(): InterfaceUser | null {
    return this._user;
  }
  public get error(): Array<string> | null {
    return this._error;
  }
  public get body(): InterfaceUserBody | null {
    return this._body;
  }

  // Funções para modificar o banco de dados
  public async register(): Promise<void> {
    try {
      this.validation();

      if (this._error.length === 0) {
        const { name, email, password } = this._body;
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        this._user = await prisma.user.create({
          data: { name, email, password: hash },
        });
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            this._error.push("O email já está em uso.");
            console.error("O email já está em uso.");
            break;

          case "P2007":
            this._error.push("Seus dados são inválidos.");
            console.error("Seus dados são inválidos.");
            break;

          default:
            this._error.push("Ocorreu um erro ao cadastrar o usuário");
            console.error(
              "Ocorreu um erro ao cadastrar o usuário",
              error.message
            );
        }
      }
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      this._user = await prisma.user.delete({ where: { id: id } });
    } catch (error) {
      console.error("Ocorreu o erro: ", error);
    }
  }

  public async login(): Promise<void> {
    try {
      this._user = await prisma.user.findUnique({
        where: { email: this._body.email },
      });

      if (!this._user) this._error.push("Usuário não existe!");
      else {
        if (!bcryptjs.compareSync(this._body.password, this._user.password))
          this._error.push("Senha incorreta!");
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2021":
            this._error.push("Conexão perdida com o banco de dados.");
            console.error("Conexão perdida com o banco de dados.");
            break;

          default:
            this._error.push("Ocorreu um erro ao cadastrar o usuário");
            console.error(
              "Ocorreu um erro ao deletar o usuário",
              error.message
            );
        }
      }
    }
  }

  // Funções para validação de dados e tratamento de erros
  private validation(): void {
    try {
      const body = this._body;

      if (validator.isEmpty(body.email)) this._error.push("E-mail inválido!");
      if (validator.isEmpty(body.password)) this._error.push("Senha inválida!");
      if (validator.isEmpty(body.name)) this._error.push("Nome inválido!");
    } catch (error: any) {
      console.error("Ocorreu o erro: ", error);
    }
  }
}
