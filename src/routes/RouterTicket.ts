import { Router } from "express";
import ControllerTicket from "../controllers/ControllerTicket";

const routerTicket = Router();
// Rotas de chamados
routerTicket.get("/ticket/:slug", ControllerTicket.getTicket);
routerTicket.get("/ticket/", ControllerTicket.getAllTickets);
routerTicket.post("/ticket/create", ControllerTicket.createTicket);
routerTicket.delete("/ticket/delete/:id", ControllerTicket.deleteTicket);
routerTicket.put("/ticket/update/:id", ControllerTicket.updateTicket);

export default routerTicket;
