const express = require("express");
const { obtenerTrabajo } = require("../../bd/controladores/trabajoController");

const router = express.Router();

router.get("/obtener-trabajo/:idTrabajo", async (req, res, next) => {
  try {
    const { idTrabajo } = req.params;
    const trabajoObtenido = await obtenerTrabajo(idTrabajo);
    res.json(trabajoObtenido);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
