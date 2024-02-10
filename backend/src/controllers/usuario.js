const knex = require("../database/conexao");
const bcrypt = require("bcrypt");
require("dotenv").config();

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha , cpf_cnpj, data_nascimento, celular, naturalidade , cidade, endereco, cargo } = req.body;

  try {
    const usuarioEncontrado = await knex("usuario").where({ email }).first();

    const cpfExiste = await knex('usuario').select('*').where('cpf_cnpj', cpf_cnpj).first();

    if (usuarioEncontrado) {
      return res.status(400).json({
        mensagem: "O e-mail informado já está sendo utilizado por outro usuário."
      });
    }

    if (cpfExiste) {
      return res.status(400).json({ mensagem: "O número de cpf ou cnpj informado já está sendo utilizado por outro usuário." });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const dataNascimentoFormatada = data_nascimento ? new Date(data_nascimento) : null;

    const usuario = await knex("usuario")
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
        cpf_cnpj,
        data_nascimento: dataNascimentoFormatada,
        naturalidade,
        celular,
        endereco,
        cidade,
        cargo
      })
      .returning("*");

    const { senha: _, ...usuarioCadastrado } = usuario[0];

    return res.status(201).json(usuarioCadastrado);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const editarUsuario = async (req, res) => {
  const { id } = req.params;

  const { nome, email, senha, cpf_cnpj, data_ascimento, naturalidade, celular, endereco, cidade, cargo } = req.body;

  try {
    const emailExiste = await knex('usuario').select('*').where('email', email).whereNot('id', id);

    const cpfExiste = await knex('usuario').select('*').where('cpf_cnpj', cpf_cnpj).whereNot('id', id);

    if (emailExiste.length > 0) {
      return res.status(400).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." });
    }

    if (cpfExiste.length > 0) {
      return res.status(400).json({ mensagem: "O número de CPF ou CNPJ informado já está sendo utilizado por outro usuário." });
    }

    const senhaCriptografada = senha ? await bcrypt.hash(senha, 10) : undefined;

    // Cria um objeto com os dados não nulos ou vazios
    const dadosAtualizados = {
      nome,
      email,
      senha: senhaCriptografada,
      cpf_cnpj,
      data_ascimento,
      naturalidade,
      celular,
      endereco,
      cidade,
      cargo
    };

    // Remove propriedades com valores nulos ou vazios
    Object.keys(dadosAtualizados).forEach((key) => (dadosAtualizados[key] == null || dadosAtualizados[key] === '') && delete dadosAtualizados[key]);

    // Verifica se há dados para serem atualizados
    if (Object.keys(dadosAtualizados).length === 0) {
      return res.status(400).json({ mensagem: "Nenhum dado válido para atualização fornecido." });
    }

    const usr = await knex("usuario")
      .update(dadosAtualizados)
      .where("id", id)
      .returning("*");

    delete usr[0].senha;

    return res.status(200).json(usr);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const excluiUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await knex("usuario")
      .select("*")
      .where({ id })
      .first();

    if (!produto) {
      return res
        .status(400)
        .json({ mensagem: "Este usuario ainda não foi cadastrado" });
    }

    const clienteExcluido = await knex("usuario").where({ id }).del();

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await knex("usuario").select("*")

    return res.status(200).json(usuarios);
  
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listarUsuarioCargo = async (req, res) => {
  const { cargo } = req.query;

  try {
    const Barbeiros = await knex("usuario").select("*").where("cargo",cargo);

    return res.status(200).json(Barbeiros);
  
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listarTrabalhadores = async (req, res) => {
  const { cargo } = req.query;

  try {
    const Barbeiros = await knex("usuario").select("*").where("cargo", "<>", "Administrador");

    return res.status(200).json(Barbeiros);
  
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  editarUsuario,
  cadastrarUsuario,
  excluiUsuario,
  listarUsuarios,
  listarUsuarioCargo,
  listarTrabalhadores
};
