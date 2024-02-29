const knex = require("../database/conexao");
require("dotenv").config();

const inscrever = async (req, res) => {
    const {nome,cpf_cnpj, celular, instagram, estado, cidade, endereco, cep} = req.body;
  
    try {
      const inscricao = await knex("inscricao")
        .insert({
            nome,
            cpf_cnpj,
            instagram,
            celular,
            estado,
            cidade,
            endereco,
            cep
        })
        .returning("*");
  
  
      return res.status(201).json(inscricao);
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const listarInscricoes = async (req, res) => {
    try {

        const inscricoes = await knex("inscricao").select("*");
      
        return res.status(200).json(inscricoes);
    
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const excluiInscricao = async (req, res) => {

    const { id } = req.params;
    try {
      const inscricao = await knex("inscricao")
        .select("*")
        .where({ id })
        .first();
  
      if (!inscricao) {
        return res
          .status(400)
          .json({ mensagem: "Inscrição inexistente." });
      }
  
      const inscricaoExcluida = await knex("inscricao").where({ id }).del();
  
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const editarInscricao = async (req, res) => {
  const { id } = req.params;

  const {nome,cpf_cnpj, celular, instagram, estado, cidade, endereco, cep} = req.body;

  try {
  

    // Cria um objeto com os dados não nulos ou vazios
    const dadosAtualizados = {
      nome,
      cpf_cnpj,
      instagram,
      celular,
      estado,
      cidade,
      endereco,
      cep
    };

    // Remove propriedades com valores nulos ou vazios
    Object.keys(dadosAtualizados).forEach((key) => (dadosAtualizados[key] == null || dadosAtualizados[key] === '') && delete dadosAtualizados[key]);

    // Verifica se há dados para serem atualizados
    if (Object.keys(dadosAtualizados).length === 0) {
      return res.status(400).json({ mensagem: "Nenhum dado válido para atualização fornecido." });
    }

    const inscricao = await knex("inscricao")
      .update(dadosAtualizados)
      .where("id", id)
      .returning("*");

    return res.status(200).json(inscricao);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

 const listarInscricoeNome = async (req, res) => {

  try {

    const inscricoes = await knex("inscricao").select("nome");
  
    return res.status(200).json(inscricoes);

} catch (error) {
  console.log(error);
  return res.status(500).json({ mensagem: "Erro interno do servidor" });
}
};

const quantidadeInscricao = async (req, res) => {

  try {

    const quantidadeInscricoes = await knex("inscricao").count("id as total");
  
    return res.status(200).json(quantidadeInscricoes);

} catch (error) {
  console.log(error);
  return res.status(500).json({ mensagem: "Erro interno do servidor" });
}
};


module.exports = {
    inscrever,
    listarInscricoes,
    editarInscricao,
    excluiInscricao,
    listarInscricoeNome,
    quantidadeInscricao
};