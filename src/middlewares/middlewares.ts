import { Request, Response, NextFunction } from "express";

class Middlewares {
  public static loginVerify(req: Request, res: Response, next: NextFunction) {
    if (req.session.user == undefined)
      res.status(401).json({ status: "error", message: "Usuário não logado." });
    else next();
  }
}

export default Middlewares;
