const express = require("express");
const {
  listarNiveles,
  obtenerNivelUsuario,
} = require("../../bd/controladores/nivelController");
const { obtenerUsuario } = require("../../bd/controladores/usuarioController");
const { authMiddleware } = require("../middlewares");

const router = express.Router();

router.get("/listado", async (req, res, next) => {
  try {
    const niveles = await listarNiveles();
    res.json(niveles);
  } catch (err) {
    next(err);
  }
});

router.get("/usuario", authMiddleware, async (req, res, next) => {
  const id = req.idUsuario;
  try {
    const { experiencia } = await obtenerUsuario(id);
    const nivelUsuario = await obtenerNivelUsuario(experiencia);
    res.json(nivelUsuario);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
