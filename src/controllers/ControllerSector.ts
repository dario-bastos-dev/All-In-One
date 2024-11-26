import { Request, Response } from "express";
import ServiceSector from "../services/ServiceSector";
export default abstract class ControllerSector {
  // Função para buscar um setor e seus chamados
  static async getSector(req: Request, res: Response): Promise<void> {
    const result = await ServiceSector.getSector(req.params.id);

    if (result != undefined) {
      if (result.status === "success") res.status(201).json(result);
      else res.status(409).json(result);
    } else
      res.status(500).json({
        status: "error",
        message: "Ocorreu um erro ao criar o usuário",
      });
  }
// Função para buscar todos os setores
  static async getAllSector(req: Request, res: Response): Promise<void> {
    const result = await ServiceSector.getAllSector();

    if (result != undefined) {
      if (result.status === "success") res.status(201).json(result);
      else res.status(409).json(result);
    } else
      res.status(500).json({
        status: "error",
        message: "Ocorreu um erro ao criar o usuário",
      });
  }

  // Função para criar um setor
  static async createSector(req: Request, res: Response): Promise<void> {
    const result = await ServiceSector.createSector(req.body);

    if (result != undefined) {
      if (result.status === "success") res.status(201).json(result);
      else res.status(409).json(result);
    } else
      res.status(500).json({
        status: "error",
        message: "Ocorreu um erro ao criar o usuário",
      });
  }

}
