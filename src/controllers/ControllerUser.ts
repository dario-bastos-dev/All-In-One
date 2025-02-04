import { Request, Response } from "express";
import ServiceUser from "../services/ServiceUser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const key = process.env.SECRET_KEY;

// Lógica para o caminho da rota
export default abstract class ControllerUser {
  // -Lógica de registro de usuário
  static async registerUser(req: Request, res: Response): Promise<void> {
    const result = await ServiceUser.createUser(req.body);

    if (result != undefined) {
      if (result.status === "success") res.status(201).json(result);
      else res.status(409).json(result);
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
      if (result.status === "success" && result.data != undefined) {
        if (key != undefined) {
          const token = jwt.sign({ id: result.data.id }, key, {
            expiresIn: "7d",
          });
          res.status(200).json({ token, ...result });
        }
      } else res.status(403).json(result);
    } else
      res.status(500).json({
        status: "error",
        message: "Ocorreu um erro ao realizar o login.",
      });
  }

  // -Lógica buscar um usuário
  static async getUser(req: Request, res: Response): Promise<void> {
    const result = await ServiceUser.getUser(req.params.id);

    if (result != undefined) {
      if (result.status === "success") res.status(200).json(result);
      else res.status(403).json(result);
    } else
      res.status(500).json({
        status: "error",
        message: "Ocorreu um erro ao buscar o usuário.",
      });
  }
  // -Lógica buscar todos os usuários
  static async getAllUser(req: Request, res: Response): Promise<void> {
    const result = await ServiceUser.getAllUser();

    if (result != undefined) {
      if (result.status === "success") res.status(200).json(result);
      else res.status(403).json(result);
    } else
      res.status(500).json({
        status: "error",
        message: "Ocorreu um erro ao buscar o usuário.",
      });
  }
  // Lógica para verificar se o usuário está logado
  public static loginVerify(req: Request, res: Response) {
    const token = req.headers["authorization"];

    if (token == undefined)
      res.status(401).json({ status: "error", message: "Usuário não logado." });
    else {
      try {
        if (key != undefined) {
          jwt.verify(token, key);
          res
            .status(200)
            .json({ status: "success", message: "Usuário logado." });
        }
      } catch (error) {
        console.log("Ocorreu um erro ao autenticar o token: ", error);
        res
          .status(401)
          .json({ status: "error", message: "Usuário não logado." });
      }
    }
  }

  // -Lógica para atualizar o usuário
  static async updateUser(req: Request, res: Response): Promise<void> {
    const result = await ServiceUser.updateUser(req.params.id, req.body);

    if (result != undefined) {
      if (result.status === "success") res.status(200).json(result);
      else res.status(403).json(result);
    } else
      res.status(500).json({
        status: "error",
        message: "Ocorreu um erro ao atualizar o usuário.",
      });
  }
}
