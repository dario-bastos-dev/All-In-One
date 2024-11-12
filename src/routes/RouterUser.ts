import { Router } from "express";
import ControllerUser from "../controllers/ControllerUser";
import Middlewares from "../middlewares/middlewares";

const routerUser = Router();
// Rotas de usuário
routerUser.get("user/verify", ControllerUser.loginVerify);
routerUser.get("/user/:id", Middlewares.loginVerify, ControllerUser.getUser);
routerUser.post("/user/create", ControllerUser.registerUser);
routerUser.post("/user/login", ControllerUser.login);

export default routerUser;
