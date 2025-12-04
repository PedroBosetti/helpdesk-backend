import { dataBase }  from "../database.js"
import { DataTypes } from "sequelize"

//Cria a tabela "Chamados" com as colunas id, titulo, descricao, data_fornecida, prioridade, tipo_da_data e situacao_da_chamado 
const Chamados = dataBase.define("chamados", {
    id: {
        primaryKey: true, //<-- Define como chave primária
        type: DataTypes.INTEGER, //<-- Define como inteiro
        autoIncrement: true //<-- Incrementa automaticamente o id
    },
    titulo: {
        type: DataTypes.STRING, //<-- Define como texto
        allowNull: false //<-- Torna obrigatório que o titulo seja fornecido
    },
    descricao: {
        type: DataTypes.STRING //<-- Define como texto
    },
    categoria: {
        type: DataTypes.STRING,
        length: 50
    },
    prioridade: {
        type: DataTypes.STRING, //<-- Define como texto
        length: 20
    },
    status: {
        type: DataTypes.ENUM("aberto", "em andamento", "concluido"), // ENUM com valores permitidos
        defaultValue: "aberto",
    },
    criadoEm: {
        type: DataTypes.DATE, // DATE para armazenar datas
        defaultValue: DataTypes.NOW, // Valor padrão: data e hora atuais
    },
    atualizadoEm: {
        type: DataTypes.DATE, // DATE para armazenar datas
        defaultValue: DataTypes.NOW, // Valor padrão: data e hora atuais
    },
    usuarioId: {
        type: DataTypes.INTEGER, //<-- Define como inteiro
        allowNull: false,// <-- Torna obrigatório que o id do usuário seja fornecido
        // Define a chave estrangeira que referencia a tabela de usuários
        references: {
            model: 'Usuarios',
            key: 'id'
        }
    },
})

export default Chamados