import { Router } from "express";
import ControllerSector from "../controllers/ControllerSector";
import Middlewares from "../middlewares/middlewares";

const routerSector = Router();
// Rotas de usuário
routerSector.get(
  "/sector/:id",
  Middlewares.loginVerify,
  ControllerSector.getSector
);
routerSector.get(
  "/sector/",
  Middlewares.loginVerify,
  ControllerSector.getAllSector
);

routerSector.post(
  "/sector/create/",
  Middlewares.loginVerify,
  ControllerSector.createSector
);

export default routerSector;
