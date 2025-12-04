import { CadastrarUsuario, LoginUsuario } from "../controller/usuario.js";
import express from "express"
import validarToken from "../middleware/usuario.js"
const routerUsuario = express.Router()

routerUsuario.post("/cadastrar", CadastrarUsuario) //<-- Rota para cadastrar um novo usuário
routerUsuario.post("/login", LoginUsuario) //<-- Rota para fazer login do usuário

export default routerUsuario