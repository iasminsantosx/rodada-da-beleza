const express = require('express');
const usuarioSchema = require("../schema/usuarioSchema");
const loginSchema = require("../schema/loginSchema");
const inscricaoSchema = require("../schema/inscricaoSchema");
const { editarUsuario,cadastrarUsuario, excluiUsuario, listarUsuarios} = require("../controllers/usuario")
const { inscrever, listarInscricoes, excluiInscricao, editarInscricao, listarInscricoeNome, quantidadeInscricao } = require("../controllers/inscricao");
const login = require("../controllers/login");
const validarRequisicao = require("../middleware/validarRequisicao");
const loginAutenticacao = require("../middleware/loginAutenticacao");

const router = express();

router.post("/usuario", validarRequisicao(usuarioSchema), cadastrarUsuario);
router.post("/login", validarRequisicao(loginSchema), login);

router.post("/inscricao", validarRequisicao(inscricaoSchema),inscrever);

router.use(loginAutenticacao);
router.put("/usuario/:id", editarUsuario);
router.delete("/usuario/:id", excluiUsuario);
router.get("/usuario",listarUsuarios)
//tem que ter login de ad
router.put("/inscricao/:id",editarInscricao);
router.delete("/inscricao/:id", excluiInscricao);
router.get("/inscricao",listarInscricoes);
router.get("/inscricao-quantidade",quantidadeInscricao);

module.exports = router;


