import Usuarios from "../model/Usuarios.js"
import jwt from "jsonwebtoken"

const segredoJwt = process.env.SEGREDO_JWT //<-- Recebe o segredo JWT do arquivo .env

//↓↓↓↓↓ Função para cadastrar um novo usuário ↓↓↓↓↓
const CadastrarUsuario = async (req, res) => {
    const { nome, email, senha, perfil } = req.body //<-- Recebe os dados do usuário do corpo da requisição

    try {
        const usuarios = await Usuarios.findAll()
        if (!nome || !email || !senha || !perfil) {
            return res.status(400).json({ mensagem: "preencha todos o campos para seguir" }) //<-- Se algum campo estiver vazio, retorna erro 400
        }
        if (usuarios.email === email) {
            return res.status(400).send({ mensagem: "email já cadastrado" }) //<-- Se o email já estiver cadastrado, retorna erro 400
        }
        const usuario = await Usuarios.create({ nome, email, senha, perfil })//<-- Cria um novo usuário com os dados fornecidos
        return res.status(201).send({ mensagem: "Usuário cadastrado com sucesso!🥳", usuario }) //<-- retorna sucesso 201 com a mensagem de usuário cadastrado com sucesso

    } catch (erro) {
        return res.status(500).send({ mensagem: "Erro ao cadastrar usuário", erro })//<-- Se ocorrer algum erro, retorna o erro 500 com a mensagem de erro ao cadastrar usuário
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//↓↓↓↓↓ Função para fazer login do usuário ↓↓↓↓↓
const LoginUsuario = async (req, res) => {
    //↓↓↓↓↓Tenta Logar↓↓↓↓↓
    try {
        const { nome, senha } = req.body //<-- Recebe os dados do usuário do corpo da requisição
        if (!nome || !senha) {
            return res.status(400).json({ mensagem: "Preencha todos os campos para seguir" }) //<-- Se algum campo estiver vazio, retorna erro 400
        }
        const usuario = await Usuarios.findOne({ where: { nome: nome } }) //<-- Busca o usuário no banco de dados pelo nome fornecido
        if (!usuario || senha !== usuario.senha) {
            return res.status(400).send({ mensagem: "Nome de usuário ou senha inválidos" }) //<-- Se o email ou senha estiverem incorretos, retorna um erro 400
        }
        const token = jwt.sign({ idUsuario: usuario.id }, segredoJwt, {expiresIn: "24h"}) //<-- Gera um token JWT com o id do usuário e o segredo JWT
        if (nome == usuario.nome && senha == usuario.senha) {
            return res.status(200).send({ mensagem: "Login realizado com sucesso", usuario, token}) //<-- Se passar pelas validações, retorna sucesso 200
        }
        //↓↓↓↓↓Se ocorrer algum erro no processo de login, retorna o erro 500↓↓↓↓↓
    } catch (erro) {
        return res.status(500).send({ mensagem: "Erro ao fazer login", erro}) //<-- Se ocorrer algum erro, retorna o erro 500 com a mensagem de erro ao fazer login
    }
}

export { CadastrarUsuario, LoginUsuario } //<-- Exporta as funções CadastrarUsuario e LoginUsuario para serem usadas em outros arquivos