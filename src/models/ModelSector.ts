import { PrismaClient, Prisma } from "@prisma/client";
import {
  InterfaceSector,
  InterfaceSectorBody,
} from "../@types/interfaces/InterfaceSector";

const prisma = new PrismaClient();

export default class Sector {
  constructor(
    private _sector: InterfaceSector | null = null,
    private _error: Array<string> = [],
    private _body: InterfaceSectorBody
  ) {}

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
      this._sector = await prisma.sector.create({
        data: { name: this._body.name },
      });
    } catch (error) {
      this._error.push("Ocorreu um erro ao criar o setor.");
      console.error("Ocorreu um erro ao criar o setor.");
    }
  }

  // -Buscar todos os setores
  public static async getAllSector(): Promise<
    | ({
        ticket: {
          id: number;
          title: string;
          description: string;
          slug: string;
          sectorId: number;
          urgency: string;
          userId: number;
        }[];
      } & {
        id: number;
        name: string;
      })[]
    | undefined
  > {
    try {
      const allSectors = await prisma.sector.findMany({
        orderBy: {
          name: `asc`,
        },
        include: {
          ticket: true,
        },
      });

      return allSectors;
    } catch (error) {
      console.error("Ocorreu um erro ao buscar os setores.");
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
