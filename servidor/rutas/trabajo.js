const express = require("express");
const { check } = require("express-validator");
const {
  eliminarTrabajo,
  listarTrabajos,
  modificarTrabajo,
  obtenerTrabajo,
  listarFormaciones,
} = require("../../bd/controladores/trabajoController");
const { validarErrores, authMiddleware } = require("../middlewares");

const router = express.Router();

router.get("/listado-trabajos", authMiddleware, async (req, res, next) => {
  const id = req.idUsuario;
  try {
    const trabajos = await listarTrabajos(id);
    res.json(trabajos);
  } catch (err) {
    next(err);
  }
});

router.get("/listado-formaciones", async (req, res, next) => {
  try {
    const listaFormaciones = await listarFormaciones();
    res.json(listaFormaciones);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
