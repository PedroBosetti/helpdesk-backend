import jwt from "jsonwebtoken" //<-- importa jwt
const segredoJwt = process.env.SEGREDO_JWT //<-- Recebe o segredo JWT do arquivo .env

// função middleware para validar o token JWT
const validarToken = (req, res, next) => {
  try {
    const { token } = req.headers; //<-- Recebe o token do cabeçalho da requisição
    if (!token) {
      console.log(token)
      return res.status(401).json({ message: "token não fornecido"}) //<-- Se o token não for fornecido, retorna erro 401
    }
    const conteudoDoToken = jwt.verify(token, segredoJwt) //<-- Usa pacote jwt para validar o token(Verificar se não esxpirou, se foi gerado com o segredo correto e pela mesma api)
    const id_usuario = conteudoDoToken.idUsuario //<-- Extrai o id do usuário do token
    req.id_usuario = id_usuario //<-- Adiciona o id do usuário a objeto da requisiação
    next() //<-- Chama o próximo middleware ou rota
  } catch (erro) {
    res.status(404).send({ message: "Acesso negado" }) //<-- Se ocorrer algum erro, retorna uma mensagem de acesso negado e o erro 404
  }
}

export default  validarToken  //<-- Exporta a função validarToken para ser usada em outros arquivos