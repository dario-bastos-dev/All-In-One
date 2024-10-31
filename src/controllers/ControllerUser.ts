import { Request, Response } from "express";
import ServiceUser from "../services/ServiceUser";

export default class ControllerUser {
  static async registerUser(req: Request, res: Response) {
    //res.send(req.body)
    const result = await ServiceUser.createUser(req.body);

    if (result != undefined) {
      const { user, error } = result;

      if (error.length > 0) {
        res.status(400).json({
          status: "error",
          message: error,
        });
      } else {
        res.status(201).json({
          status: "success",
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    } else
      res.status(500).json({
        status: "error",
        message: "Ocorreu um erro ao criar o usuário",
      });
  }
}
