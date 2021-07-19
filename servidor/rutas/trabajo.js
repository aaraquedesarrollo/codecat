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
  try {
    const trabajos = await listarTrabajos();
    res.json(trabajos);
  } catch (err) {
    next(err);
  }
});

router.get("/listado-formaciones", authMiddleware, async (req, res, next) => {
  try {
    const listaFormaciones = await listarFormaciones();
    res.json(listaFormaciones);
  } catch (err) {
    next(err);
  }
});

router.get("/trabajo/:idTrabajo", authMiddleware, async (req, res, next) => {
  try {
    const { idTrabajo } = req.params;
    const trabajoObtenido = await obtenerTrabajo(idTrabajo);
    res.json(trabajoObtenido);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
