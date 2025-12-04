import express from "express";
import cors from "cors";
import "dotenv/config";
import { dataBase } from "./database.js";
import "./model/relacionamentos.js";

const app = express();
app.use(cors());
app.use(express.json());

import routerUsuario from "./routes/usuario.js";
import routerChamado from "./routes/chamados.js";

app.use("/usuario", routerUsuario);
app.use("/chamado", routerChamado);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});
