import express from "express";
const app = express();
import path from "path";
import routerUser from "./src/routes/RouterUser";
import routerTicket from "./src/routes/RouterTicket";
import helmet from "helmet";
import corsConfig from "./src/config/corsConfig";
import routerSector from "./src/routes/RouterSector";

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
app.use(corsConfig);
app.use(routerUser);
app.use(routerTicket);
app.use(routerSector);

export default app;
