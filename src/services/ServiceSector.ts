import {
  InterfaceSectorBody,
  SectorResponse,
} from "../@types/interfaces/InterfaceSector";
import Sector from "../models/ModelSector";

export default abstract class ServiceSector {
  // -Lógica para criar o setor

  // -Lógica para buscar o setor e os seus chamados
  static async getSector(id: string) {
    try {
      const userId = parseInt(id);
      const newSector = new Sector(undefined);
      const sector = await newSector.getSector(userId);

      let response: SectorResponse;

      if (newSector.error != null && newSector.error.length > 0) {
        response = {
          status: "error",
          error: newSector.error,
        };

        return response;
      } else if (sector != null) {
        response = {
          status: "success",
          data: {
            id: sector.id,
            name: sector.name,
            tickets: sector.ticket,
          },
        };

        console.log(response);

        return response;
      }
    } catch (error) {}
  }

  // -Lógica para buscar todos os setores
  static async getAllSector() {
    try {
      const newSector = new Sector(undefined);
      const sector = await newSector.getAllSector();

      let response: SectorResponse;

      if (newSector.error != null && newSector.error.length > 0) {
        response = {
          status: "error",
          error: newSector.error,
        };

        return response;
      } else if (sector != null) {
        response = {
          status: "success",
          data: sector,
        };

        console.log(response);

        return response;
      }
    } catch (error) {}
  }

  // Função para criar um setor
  static async createSector(body: InterfaceSectorBody) {
    try {
      const sector = new Sector(body);
      await sector.create();

      let response: SectorResponse;

      if (sector.error != null && sector.error.length > 0) {
        response = {
          status: "error",
          error: sector.error,
        };

        return response;
      } else if (sector.sector != null) {
        response = {
          status: "success",
          data: sector.sector,
        };

        console.log(response);

        return response;
      }
    } catch (error) {}
  }
}
