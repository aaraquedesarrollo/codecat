const express = require("express");
const {
  obtenerNivelUsuario,
} = require("../../bd/controladores/nivelController");
const {
  listarFormaciones,
  listarTrabajos,
} = require("../../bd/controladores/trabajoController");
const { obtenerUsuario } = require("../../bd/controladores/usuarioController");
const { authMiddleware } = require("../middlewares");

const router = express.Router();

router.get("/cargar-informacion", authMiddleware, async (req, res, next) => {
  try {
    const { idUsuario } = req;
    const usuario = await obtenerUsuario(idUsuario);
    const nivelUsuario = await obtenerNivelUsuario(usuario.experiencia);
    const listadoFormaciones = await listarFormaciones();
    const listadoTrabajos = await listarTrabajos();
    res.json({ usuario, nivelUsuario, listadoFormaciones, listadoTrabajos });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
