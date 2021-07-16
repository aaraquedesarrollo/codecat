const express = require("express");
const {
  crearTrabajo,
  eliminarTrabajo,
  listarTrabajos,
  modificarTrabajo,
  obtenerTrabajo,
} = require("../../bd/controladores/trabajoController");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const trabajos = await listarTrabajos();
    res.json(trabajos);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
