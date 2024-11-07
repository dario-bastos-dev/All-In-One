import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const key = process.env.SECRET_KEY;

class Middlewares {
  public static loginVerify(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"];

    if (token == undefined)
      res.status(401).json({ status: "error", message: "Usuário não logado." });
    else {
      try {
        if (key != undefined) {
          jwt.verify(token, key);
          next();
        }
      } catch (error) {
        console.log("Ocorreu um erro ao autenticar o token: ", error);
        res
          .status(401)
          .json({ status: "error", message: "Usuário não logado." });
      }
    }
  }
}

export default Middlewares;
