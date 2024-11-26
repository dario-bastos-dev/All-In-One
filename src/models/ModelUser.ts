import { PrismaClient, Prisma } from "@prisma/client";
import {
  InterfaceAllUser,
  InterfaceUser,
  InterfaceUserAll,
  InterfaceUserBody,
  InterfaceUserUpdate,
} from "../@types/interfaces/interfaces";
import validator from "validator";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export default class User {
  private _user: InterfaceUser | null;
  private _error: Array<string>;
  private _body: InterfaceUserAll | undefined;

  constructor(body: InterfaceUserAll | undefined) {
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
  // Funções para modificar o banco de dados
  // -Registar usuário no banco de dados
  public async register(): Promise<void> {
    try {
      this.validation();

      if (this._error.length === 0) {
        const { name, email, password } = this._body as InterfaceUserBody;
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        this._user = await prisma.user.create({
          data: {
            name,
            email,
            password: hash,
            permission: "admin",
          },
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
            this._error.push("Ocorreu um erro ao cadastrar o usuário.");
            console.error(
              "Ocorreu um erro ao cadastrar o usuário.",
              error.message
            );
        }
      }
    }
  }
  // -Buscar usuário
  public async getUser(id: number): Promise<void> {
    try {
      this._user = await prisma.user.findUnique({
        where: { id },
        include: { sector: true, tickets: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2001":
            this._error.push(
              "Erro: Registro não encontrado. O ID especificado não existe."
            );
            console.error(
              "Erro: Registro não encontrado. O ID especificado não existe."
            );
            break;
          case "P2003":
            this._error.push(
              "Erro: Violação de chave estrangeira. O registro está sendo referenciado por outra tabela."
            );
            console.error(
              "Erro: Violação de chave estrangeira. O registro está sendo referenciado por outra tabela."
            );
            break;
          case "P2014":
            this._error.push(
              "Erro: Violação de relação. O registro ainda tem dependências."
            );
            console.error(
              "Erro: Violação de relação. O registro ainda tem dependências."
            );
            break;
          case "P2021":
            this._error.push("Erro: Conexão perdida com o banco de dados.");
            console.error("Erro: Conexão perdida com o banco de dados.");
            break;
          case "P2022":
            this._error.push("Erro: Falha na execução do comando SQL.");
            console.error("Erro: Falha na execução do comando SQL.");
            break;
          default:
            this._error.push("Erro conhecido do Prisma:", error.message);
            console.error("Erro conhecido do Prisma:", error.message);
        }
      }
    }
  }

  // -Buscar todos os usuários
  public async getAllUser(): Promise<InterfaceAllUser | undefined> {
    try {
      const allUser = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        include: { sector: true },
      });

      return allUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2001":
            this._error.push(
              "Erro: Registro não encontrado. O ID especificado não existe."
            );
            console.error(
              "Erro: Registro não encontrado. O ID especificado não existe."
            );
            break;
          case "P2003":
            this._error.push(
              "Erro: Violação de chave estrangeira. O registro está sendo referenciado por outra tabela."
            );
            console.error(
              "Erro: Violação de chave estrangeira. O registro está sendo referenciado por outra tabela."
            );
            break;
          case "P2014":
            this._error.push(
              "Erro: Violação de relação. O registro ainda tem dependências."
            );
            console.error(
              "Erro: Violação de relação. O registro ainda tem dependências."
            );
            break;
          case "P2021":
            this._error.push("Erro: Conexão perdida com o banco de dados.");
            console.error("Erro: Conexão perdida com o banco de dados.");
            break;
          case "P2022":
            this._error.push("Erro: Falha na execução do comando SQL.");
            console.error("Erro: Falha na execução do comando SQL.");
            break;
          default:
            this._error.push("Erro conhecido do Prisma:", error.message);
            console.error("Erro conhecido do Prisma:", error.message);
        }
      }
    }
  }

  // -Atualizar usuário
  public async updateUser(
    id: number,
    body: InterfaceUserUpdate
  ): Promise<void> {
    try {
      if (body.password != undefined) {
        const salt = bcryptjs.genSaltSync(10);
        body.password = bcryptjs.hashSync(body.password, salt);
        this._user = await prisma.user.update({
          where: { id },
          data: body,
        });
      } else
        this._user = await prisma.user.update({
          where: { id },
          data: body,
        });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2001":
            this._error.push(
              "Registro não encontrado. O ID especificado não existe."
            );
            console.error(
              "Registro não encontrado. O ID especificado não existe."
            );
            break;
          case "P2003":
            this._error.push("Violação de chave estrangeira.");
            console.error("Violação de chave estrangeira.");
            break;
          case "P2004":
            this._error.push(
              "Violação de restrição de tipo. Verifique os tipos dos campos na consulta."
            );
            console.error(
              "Violação de restrição de tipo. Verifique os tipos dos campos na consulta."
            );
            break;
          default:
            this._error.push("Erro conhecido do Prisma:", error.message);
            console.error("Erro conhecido do Prisma:", error.message);
        }
      } else {
        this._error.push("Ocorreu um erro ao atualizar o chamado.");
        console.error("Ocorreu um erro ao atualizar o chamado");
      }
    }
  }

  // -Deletar usuário
  public async delete(id: number): Promise<void> {
    try {
      this._user = await prisma.user.delete({ where: { id: id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2001":
            this._error.push(
              "Erro: Registro não encontrado. O ID especificado não existe."
            );
            console.error(
              "Erro: Registro não encontrado. O ID especificado não existe."
            );
            break;
          case "P2003":
            this._error.push(
              "Erro: Violação de chave estrangeira. O registro está sendo referenciado por outra tabela."
            );
            console.error(
              "Erro: Violação de chave estrangeira. O registro está sendo referenciado por outra tabela."
            );
            break;
          case "P2014":
            this._error.push(
              "Erro: Violação de relação. O registro ainda tem dependências."
            );
            console.error(
              "Erro: Violação de relação. O registro ainda tem dependências."
            );
            break;
          case "P2021":
            this._error.push("Erro: Conexão perdida com o banco de dados.");
            console.error("Erro: Conexão perdida com o banco de dados.");
            break;
          case "P2022":
            this._error.push("Erro: Falha na execução do comando SQL.");
            console.error("Erro: Falha na execução do comando SQL.");
            break;
          default:
            this._error.push("Erro conhecido do Prisma:", error.message);
            console.error("Erro conhecido do Prisma:", error.message);
        }
      }
    }
  }
  // -Fazer login no sisitema
  public async login(): Promise<void> {
    try {
      if (this._body != undefined) {
        this._user = await prisma.user.findUnique({
          where: { email: this._body.email },
        });

        if (this._user === null) this._error.push("Usuário não existe!");
        else {
          if (
            bcryptjs.compareSync(this._body.password, this._user.password) ===
            false
          )
            this._error.push("Senha incorreta!");
        }
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2021":
            this._error.push("Conexão perdida com o banco de dados.");
            console.error("Conexão perdida com o banco de dados.");
            break;

          default:
            this._error.push("Ocorreu um erro ao realizar o login.");
            console.error(
              "Ocorreu um erro ao realizar o login.",
              error.message
            );
        }
      }
    }
  }

  // Funções para validação de dados e tratamento de erros
  private validation(): void {
    try {
      const body = this._body as InterfaceUserBody;

      if (validator.isEmpty(body.email)) this._error.push("E-mail inválido!");
      if (validator.isEmpty(body.password)) this._error.push("Senha inválida!");
      if (validator.isEmpty(body.name)) this._error.push("Nome inválido!");
    } catch (error: any) {
      console.error("Ocorreu o erro: ", error);
    }
  }
}
