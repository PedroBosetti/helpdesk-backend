import express from "express"
import { CriarChamado, EditarChamado, ListarChamado, ListarTodosChamados, DeletarChamado } from "../controller/chamados.js"
import validarToken from "../middleware/usuario.js"

const routerChamado = express.Router()

routerChamado.post("/criar", validarToken, CriarChamado) //<-- Rota para criar um novo chamado
routerChamado.put("/editar/:id", validarToken, EditarChamado) //<-- Rota para editar um chamado existente
routerChamado.delete("/deletar/:id", validarToken, DeletarChamado) //<-- Rota para deletar um chamado existente
routerChamado.get("/listar/:id", validarToken, ListarChamado) //<-- Rota para listar um chamado existente
routerChamado.get("/listar", validarToken, ListarTodosChamados) //<-- Rota para listar todos os Chamados do usuário

export default routerChamado