import { Request, Response } from "express";
import ServiceUser from "../services/ServiceUser";

// Lógica para o caminho da rota
export default class ControllerUser {
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
      if (result.status === "success") {
        req.session.regenerate((err) => {
          if (err)
            res.status(500).json({
              status: "error",
              message: "Ocorreu um erro ao realizar o login.",
            });
          else req.session.user = result.data;
        });
        res.status(200).json(result);
      } else res.status(403).json(result);
    } else
      res.status(500).json({
        status: "error",
        message: "Ocorreu um erro ao realizar o login.",
      });
  }

  // -Lógica para verificar se o usuário esta logado
  public static verifyLogin(req: Request, res: Response) {
    if (req.session.user == undefined)
      res.status(401).json({ status: "error", message: "Usuário nao logado." });
    else
      res.status(200).json({
        status: "success",
        message: "autorized",
        data: {
          id: req.session.user.id,
          name: req.session.user.name,
          email: req.session.user.email,
        },
      });
  }

  // -Lógica para deslogar o usuário
  public static logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err)
        res.status(500).json({
          status: "error",
          message: "Ocorreu um erro ao realizar o logout.",
        });
      else
        res
          .status(200)
          .json({ status: "success", message: "Logout realizado." });
    });
  }

  // -Lógica buscar o usuário
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
}
