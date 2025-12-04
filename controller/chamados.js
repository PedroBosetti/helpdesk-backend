import Chamados from "../model/Chamados.js";

//↓↓↓↓↓ Função para criar um novo chamado ↓↓↓↓↓
const CriarChamado = async (req, res) => {
  try {
    const { titulo, descricao, categoria, prioridade, status } = req.body;
    const usuarioId = req.id_usuario;
    const criadoEm = new Date().toLocaleString("pt-br", { timeZone: "America/Sao_Paulo" });

    if (!titulo || !descricao || !categoria || !prioridade || !status) {
      return res.status(400).send({ erro: "Os campos devem ser preenchidos corretamente." });
    }

    const chamado = await Chamados.create({
      titulo,
      descricao,
      categoria,
      prioridade,
      status,
      criadoEm,
      usuarioId
    });

    return res.status(201).send({ mensagem: "Chamado criado com sucesso! 🥳", chamado });
  } catch (erro) {
    return res.status(500).send({ mensagem: "Erro ao criar chamado", erro });
  }
};

//↓↓↓↓↓ Função para editar um chamado existente ↓↓↓↓↓
const EditarChamado = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, categoria, prioridade, status } = req.body;
    const usuarioId = req.id_usuario;

    const chamado = await Chamados.findOne({ where: { id, usuarioId } });
    if (!chamado) {
      return res.status(404).send({ erro: "Chamado não encontrado." });
    }

    const atualizadoEm = new Date().toLocaleString("pt-br", { timeZone: "America/Sao_Paulo" });

    await chamado.update({
      titulo,
      descricao,
      categoria,
      prioridade,
      status,
      atualizadoEm
    });

    return res.status(200).send({ mensagem: "Chamado atualizado com sucesso!", chamado });
  } catch (erro) {
    return res.status(500).send({ mensagem: "Erro ao atualizar chamado", erro });
  }
};

//↓↓↓↓↓ Função para trazer um chamado existente ↓↓↓↓↓
const ListarChamado = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.id_usuario;

    const chamado = await Chamados.findOne({ where: { id, usuarioId } });
    if (!chamado) {
      return res.status(404).send({ erro: "Chamado não encontrado" });
    }

    return res.status(200).send({ chamado });
  } catch (erro) {
    return res.status(500).send({ mensagem: `Erro ao trazer chamado: ${erro}` });
  }
};

//↓↓↓↓↓ Função para trazer todos os chamados do usuário ↓↓↓↓↓
const ListarTodosChamados = async (req, res) => {
  try {
    const usuarioId = req.id_usuario;
    const chamados = await Chamados.findAll({ where: { usuarioId } });
    return res.status(200).send({ chamados });
  } catch (erro) {
    return res.status(500).send({ mensagem: "Erro ao listar chamados", erro });
  }
};

//↓↓↓↓↓ Função para deletar um chamado existente ↓↓↓↓↓
const DeletarChamado = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.id_usuario;

    const chamado = await Chamados.findOne({ where: { id, usuarioId } });
    if (!chamado) {
      return res.status(404).send({ erro: "Chamado não encontrado." });
    }

    await chamado.destroy();
    return res.status(200).send({ mensagem: "Chamado deletado com sucesso!" });
  } catch (erro) {
    return res.status(500).send({ mensagem: "Erro ao deletar chamado", erro });
  }
};

export { CriarChamado, EditarChamado, ListarChamado, ListarTodosChamados, DeletarChamado };
