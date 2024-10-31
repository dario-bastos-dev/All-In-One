import { Router } from "express";
import ControllerUser from "../controllers/ControllerUser";

const routerUser = Router();

routerUser.post("/user/create", ControllerUser.registerUser);

export default routerUser;
