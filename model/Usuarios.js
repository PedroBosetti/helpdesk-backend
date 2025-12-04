import  { dataBase }  from "../database.js";
import { DataTypes } from "sequelize";


// Cria a tabela "Usuario" com as colunas id, nome, email e senha
const Usuarios = dataBase.define('Usuarios', {
    id: {
        type: DataTypes.INTEGER, //<-- Define como inteiro
        primaryKey: true, //<-- Define como chave primária
        allowNull: false, //<-- Torna obrigatório que o id seja fornecido
        autoIncrement: true //<-- Incrementa automaticamente o id
    }, 
    nome: {
        type: DataTypes.STRING, //<-- Define como texto
        allowNull: false //<-- Torna obrigatório que o nome seja fornecido
    },
    email: {
        type: DataTypes.STRING, //<-- Define como texto
        unique: true, //<-- Torna o email único
        allowNull: false //<-- Torna obrigatório que o email seja fornecido
    },
    senha: {
        type: DataTypes.STRING, //<-- Define como texto
        allowNull: false //<-- Torna obrigatório que a senha seja fornecida
    },
    perfil: {
        type: DataTypes.ENUM("aluno", "professor", "tecnico")
    }
})

export default Usuarios