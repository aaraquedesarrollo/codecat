const express = require("express");
const {
  crearHistorial,
} = require("../../bd/controladores/historialController");
const { authMiddleware } = require("../middlewares");

const router = express.Router();

router.post("/crear-historial", authMiddleware, async (req, res, next) => {
  try {
    const { idUsuario } = req;
    const historialCreado = await crearHistorial(idUsuario);
    res.status(201).json(historialCreado);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
