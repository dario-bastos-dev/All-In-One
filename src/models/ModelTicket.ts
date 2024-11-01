import { PrismaClient, Prisma } from "@prisma/client";
import validator from "validator";
import {
  InterfaceTicket,
  InterfaceTicketBody,
  InterfaceTicketsAll,
  InterfaceTicketUpdate,
} from "../@types/interfaces/InterfaceTickets";
import slugify from "slugify";

const prisma = new PrismaClient();

export default class User {
  private _ticket: InterfaceTicket | InterfaceTicketsAll | null;
  private _error: Array<string>;
  private _body: InterfaceTicketBody | undefined;

  constructor(body: InterfaceTicketBody | undefined) {
    this._ticket = null;
    this._error = [];
    this._body = body;
  }

  // Funçòes para acessar os valores da classe
  public get user(): InterfaceTicket | InterfaceTicketsAll | null {
    return this._ticket;
  }
  public get error(): Array<string> | null {
    return this._error;
  }
  // Funções para modificar o banco de dados
  // -Registar chamado no banco de dados
  public async register(): Promise<void> {
    try {
      this.validation();

      if (this._error.length === 0) {
        if (this._body != undefined) {
          const { title, description, sectorId, urgency, userId } = this._body;
          const slug = slugify(title).toLowerCase();

          this._ticket = await prisma.ticket.create({
            data: { title, description, sectorId, urgency, userId, slug },
          });
        }
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2000":
            this._error.push("Erro: Valor de entrada inválido.");
            console.error("Erro: Valor de entrada inválido.");
            break;
          case "P2003":
            this._error.push("Erro: Violação de chave estrangeira.");
            console.error("Erro: Violação de chave estrangeira.");
            break;
          case "P2004":
            this._error.push("Erro: Violação de restrição de tipo.");
            console.error("Erro: Violação de restrição de tipo.");
            break;
          case "P2011":
            this._error.push("Erro: Violação de restrição de valor nulo.");
            console.error("Erro: Violação de restrição de valor nulo.");
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
  // -Ler todos os chamados
  public async getAllTickets(): Promise<void> {
    try {
      this._ticket = await prisma.ticket.findMany({
        orderBy: {
          id: "asc",
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2004":
            this._error.push(
              "Erro: Violação de restrição de tipo. Verifique os tipos dos campos na consulta."
            );
            console.error(
              "Erro: Violação de restrição de tipo. Verifique os tipos dos campos na consulta."
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
      } else {
        this._error.push("Ocorreu um erro ao buscar os chamados.");
        console.error("Ocorreu um erro ao buscar os chamados");
      }
    }
  }

  // -Ler um chamado específico
  public async getTicket(id: number): Promise<void> {
    try {
      this._ticket = await prisma.ticket.findUnique({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2004":
            this._error.push(
              "Erro: Violação de restrição de tipo. Verifique os tipos dos campos na consulta."
            );
            console.error(
              "Erro: Violação de restrição de tipo. Verifique os tipos dos campos na consulta."
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
      } else {
        this._error.push("Ocorreu um erro ao buscar os chamados.");
        console.error("Ocorreu um erro ao buscar os chamados");
      }
    }
  }
  // -Atualizar chamado
  public async updateTicket(
    id: number,
    body: InterfaceTicketUpdate
  ): Promise<void> {
    try {
      this._ticket = await prisma.ticket.update({
        where: { id },
        data: body,
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
            this._error.push("Erro: Violação de chave estrangeira.");
            console.error("Erro: Violação de chave estrangeira.");
            break;
          case "P2004":
            this._error.push(
              "Erro: Violação de restrição de tipo. Verifique os tipos dos campos na consulta."
            );
            console.error(
              "Erro: Violação de restrição de tipo. Verifique os tipos dos campos na consulta."
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

  // -Deletar chamado
  public async delete(id: number): Promise<void> {
    try {
      this._ticket = await prisma.ticket.delete({ where: { id: id } });
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
      } else {
        this._error.push("Ocorreu um erro ao deletar o chamado.");
        console.error("Ocorreu um erro ao deletar o chamado");
      }
    }
  }

  // Funções para validação de dados e tratamento de erros
  private validation(): void {
    try {
      if (this._body != undefined) {
        const body = this._body;

        if (validator.isEmpty(body.title))
          this._error.push("Defina um título!");
        if (validator.isEmpty(body.description))
          this._error.push("Defina uma descrição!");
        if (validator.isEmpty(body.urgency))
          this._error.push("Defina uma urgencia!");
        if (body.sectorId != undefined)
          this._error.push("Defina um setor!");
        if (body.userId != undefined)
          this._error.push("usuário não está logado!");
      }
    } catch (error: any) {
      console.error("Ocorreu o erro: ", error);
    }
  }
}
