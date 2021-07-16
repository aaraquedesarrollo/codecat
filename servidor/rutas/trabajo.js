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
  const trabajos = await listarTrabajos();
  res.json(trabajos);
});

module.exports = router;
