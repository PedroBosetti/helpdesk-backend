import express from "express" // importa express
import cors from "cors" // importa cors
import "dotenv/config" //importa dotenv para usar váriaveis do arquivo .env
import {dataBase}  from "./database.js" //importa a instância do sequelize para conectar com o banco de dados
import  "./model/relacionamentos.js" //importa os relacionamentos entre os modelos

const app = new express() //cria uma instância do express
app.use(cors()) // habilita CORS para permitir requisições do frontend
app.use(express.json()) // permite que o express entenda requisições com corpo em JSON
// await dataBase.sync() //<--Sincroniza o banco de dados(atualiza o banco de dados com as alterações feitas no modelo)

import routerUsuario from "./routes/usuario.js" //importa as rotas de usuário
import routerChamado from "./routes/chamados.js" //importa as rotas de tarefas

app.use("/usuario", routerUsuario) //Define a rota /usuario para as rotas de usuário
app.use("/chamado", routerChamado)

app.listen(3000, () => {console.log("Servidor rodando na porta 3000🚀")}) //inicia o servidor na porta 3000
