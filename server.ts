import express from "express";
const app = express();
import path from "path";
import routerUser from "./src/routes/RouterUser";

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
app.use(routerUser);

export default app;
