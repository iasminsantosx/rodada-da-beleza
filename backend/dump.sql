CREATE DATABASE belezadb;

CREATE TABLE USUARIO (
	id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  cpf_cnpj CHAR(15) NOT NULL UNIQUE,
  data_nascimento DATE,
  celular TEXT NOT NULL,
  naturalidade TEXT,
  cidade TEXT,
  endereco TEXT,
  cargo TEXT NOT NULL
);

CREATE TABLE INSCRICAO (
	id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  cpf_cnpj CHAR(15),
  instagram TEXT,
  celular TEXT,
  estado TEXT,
  cidade TEXT,
  endereco TEXT,
  cep TEXT
);



 