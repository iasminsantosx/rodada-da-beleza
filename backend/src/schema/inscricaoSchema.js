const joi = require("joi");

const inscricaoSchema = joi.object({
  nome: joi.string().min(2).required().messages({
    "string.min": "O campo nome deve ser preenchido corretamente",
    "any.required": "O campo nome é obrigatório.",
    "string.empty": "O campo nome é obrigatório.",
  }),
  cpf_cnpj: joi.string().min(11).required().messages({
    "string.min": "O campo CPF/CNPJ deve ser preenchido corretamente",
    "any.required": "O campo CPF/CNPJ é obrigatório.",
    "string.empty": "O campo CPF/CPNJ é obrigatório.",
  }),
  instagram: joi.string().allow('').optional(),
  celular: joi.string().allow('').optional(),
  estado: joi.string().allow('').optional(),
  cidade: joi.string().allow('').optional(),
  endereco: joi.string().allow('').optional(),
  cep: joi.string().allow('').optional()

});

module.exports = inscricaoSchema;