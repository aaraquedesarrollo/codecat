const express = require("express");
const { check } = require("express-validator");
const {
  crearTrabajo,
  eliminarTrabajo,
  listarTrabajos,
  modificarTrabajo,
  obtenerTrabajo,
} = require("../../bd/controladores/trabajoController");
const { validarErrores, authMiddleware } = require("../middlewares");

const router = express.Router();

router.get("/listado", authMiddleware, async (req, res, next) => {
  const id = req.idUsuario;
  try {
    const trabajos = await listarTrabajos(id);
    res.json(trabajos);
  } catch (err) {
    next(err);
  }
});
router.get(
  "/listado/:id",
  check("id", "La id es incorrecta").isMongoId(),
  validarErrores,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const trabajo = await obtenerTrabajo(id);
      res.json(trabajo);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
