import { Request, Response } from "express";
import ServiceUser from "../services/ServiceUser";

// Lógica para o caminho da rota
export default class ControllerUser {
  // -Lógica de registro de usuário
  static async registerUser(req: Request, res: Response): Promise<void> {
    const result = await ServiceUser.createUser(req.body);

    if (result != undefined) {
      if (result != undefined) {
        if (result.status === "success") res.status(201).json(result);
        else res.status(409).json(result);
      }
    } else
      res.status(500).json({
        status: "error",
        message: "Ocorreu um erro ao criar o usuário",
      });
  }
  // -Lógica de login do usuário
  static async login(req: Request, res: Response): Promise<void> {
    const result = await ServiceUser.login(req.body);

    if (result != undefined) {
      if (result.status === "success") res.status(200).json(result);
      else res.status(403).json(result);
    } else
      res.status(500).json({
        status: "error",
        message: "Ocorreu um erro ao realizar o login.",
      });
  }
}
