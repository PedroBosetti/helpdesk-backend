import { Sequelize } from "sequelize"; //Importar Sequelize para conectar com o banco de dados
const dataBase = new Sequelize(process.env.BANCO_DE_DADOS, {})//Cria uma instância  do Sequelize para conectar com o banco de dados

try {
    await dataBase.authenticate() //tenta conectar com o banco de dados
    console.log("Conexão com o banco de dados estabelecida com sucesso") //Se a conexão com o banco de dados for um sucesso, exibe a mensagem de sucesso
} catch (erro) {
    console.log("erro ao conectar com o banco de dados")
}

export { dataBase } ///exporta a instãncia do Sequelize para ser usada em outros arquivos
