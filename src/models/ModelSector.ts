import { PrismaClient, Prisma } from "@prisma/client";
import {
  InterfaceSector,
  InterfaceSectorAll,
  InterfaceSectorBody,
  InterfaceSectorTickets,
} from "../@types/interfaces/InterfaceSector";

const prisma = new PrismaClient();

export default class Sector {
  private _sector: InterfaceSector | null;
    private _error: Array<string>;
    private _body: InterfaceSectorBody | undefined;
  constructor(body: InterfaceSectorBody | undefined) {
    this._sector = null;
    this._error = [];
    this._body = body;
  }

  // Funções para acessar os atributos da classe
  public get sector(): InterfaceSector | null {
    return this._sector;
  }
  public get error(): Array<string> | null {
    return this._error;
  }

  // Funções para modificar o banco de dados
  // -Registar setor no banco de dados
  public async create(): Promise<void> {
    try {
      if (this._body != undefined)
        this._sector = await prisma.sector.create({
          data: { name: this._body.name },
        });
    } catch (error) {
      this._error.push("Ocorreu um erro ao criar o setor.");
      console.error("Ocorreu um erro ao criar o setor.");
    }
  }

  // -Buscar todos os setores
  public async getAllSector(): Promise<InterfaceSectorAll | undefined> {
    try {
      const allSectors = await prisma.sector.findMany({
        orderBy: {
          name: `desc`,
        },
      });

      return allSectors;
    } catch (error) {
      console.error("Ocorreu um erro ao buscar os setores.");
      this._error.push("Ocorreu um erro ao buscar os setores!");
    }
  }

  // -Buscar todos os setores
  public async getSector(
    id: number
  ): Promise<InterfaceSectorTickets | undefined> {
    try {
      const allSectors = await prisma.sector.findUnique({
        where: {
          id,
        },
        include: {
          ticket: true,
        },
      });

      return allSectors;
    } catch (error) {
      console.error("Ocorreu um erro ao buscar os setores.");
      this._error.push("Ocorreu um erro ao buscar o setor!");
    }
  }

  // -Deletar setor
  public static async deleteSector(id: number): Promise<void> {
    try {
      await prisma.sector.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error("Ocorreu um erro ao deletar o setor.");
    }
  }
}
