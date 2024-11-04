import { Request, Response } from "express";
import ServiceTicket from "../services/ServiceTicket";

// Lógica para o caminho da rota
export default class ControllerTicket {
  // -Lógica de registro de tickets
  static async createTicket(req: Request, res: Response): Promise<void> {
    const result = await ServiceTicket.createTicket(req.body);

    if (result != undefined) {
      if (result.status === "success") res.status(201).json(result);
      else res.status(409).json(result);
    } else
      res.status(500).json({
        status: "error",
        message: "Ocorreu um erro ao criar o ticket.",
      });
  }
  // -Lógica para buscar todos os tickets
  static async getAllTickets(req: Request, res: Response): Promise<void> {
    const result = await ServiceTicket.getAllTickets();

    if (result != undefined) {
      if (result.status === "success") res.status(200).json(result);
      else res.status(403).json(result);
    } else
      res.status(500).json({
        status: "error",
        message: "Ocorreu um erro ao buscar os tickets.",
      });
  }
  // -Lógica para buscar um ticket
  static async getTicket(req: Request, res: Response): Promise<void> {
    const result = await ServiceTicket.getTicket(req.params.slug);

    if (result != undefined) {
      if (result.status === "success") res.status(200).json(result);
      else res.status(403).json(result);
    } else
      res.status(500).json({
        status: "error",
        message: "Ocorreu um erro ao buscar o ticket.",
      });
  }
  // -Lógica para atualizar um ticket
  static async updateTicket(req: Request, res: Response): Promise<void> {
    const result = await ServiceTicket.updateTicket(req.params.id, req.body);

    if (result != undefined) {
      if (result.status === "success") res.status(200).json(result);
      else res.status(403).json(result);
    } else
      res.status(500).json({
        status: "error",
        message: "Ocorreu um erro ao atualizar o ticket.",
      });
  }
  // -Lógica para deletar um ticket
  static async deleteTicket(req: Request, res: Response): Promise<void> {
    const result = await ServiceTicket.deleteTicket(req.params.id);

    if (result != undefined) {
      if (result.status === "success") res.status(200).json(result);
      else res.status(403).json(result);
    } else
      res.status(500).json({
        status: "error",
        message: "Ocorreu um erro ao deletar o ticket.",
      });
  }
}
