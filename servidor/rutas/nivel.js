const express = require("express");
const { listarNiveles } = require("../../bd/controladores/nivelController");

const router = express.Router();

router.get("/listado", async (req, res, next) => {
  try {
    const niveles = await listarNiveles();
    res.json(niveles);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
