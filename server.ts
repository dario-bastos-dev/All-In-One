import express from "express";
const app = express();
import path from "path";
import routerUser from "./src/routes/RouterUser";
import routerTicket from "./src/routes/RouterTicket";
import sessionUsage from "./src/middlewares/session";
import helmet from "helmet";
import cors from "cors";

// Iniciando servidor
const port = 8080;
app.listen(port, () => {
  console.log("Servidor on-line!");
});

// Static
app.use(express.static(path.join(__dirname, "public")));

// Body-Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middlewars
app.use(helmet());
app.use(
  cors({
    credentials: true,
  })
);
app.use(sessionUsage);
app.use(routerUser);
app.use(routerTicket);

export default app;
