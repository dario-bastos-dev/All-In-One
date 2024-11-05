import { Router } from "express";
import ControllerTicket from "../controllers/ControllerTicket";
import Middlewares from "../middlewares/middlewares";

const routerTicket = Router();
// Rotas de chamados
routerTicket.get(
  "/ticket/:slug",
  Middlewares.loginVerify,
  ControllerTicket.getTicket
);
routerTicket.get(
  "/ticket/",
  Middlewares.loginVerify,
  ControllerTicket.getAllTickets
);
routerTicket.post(
  "/ticket/create",
  Middlewares.loginVerify,
  ControllerTicket.createTicket
);
routerTicket.delete(
  "/ticket/delete/:id",
  Middlewares.loginVerify,
  ControllerTicket.deleteTicket
);
routerTicket.put(
  "/ticket/update/:id",
  Middlewares.loginVerify,
  ControllerTicket.updateTicket
);

export default routerTicket;
