const express = require("express");
const {
  obtenerNivelUsuario,
  obtenerSigueinteNivel,
} = require("../../bd/controladores/nivelController");
const {
  listarFormaciones,
  listarTrabajos,
} = require("../../bd/controladores/trabajoController");
const {
  obtenerUsuario,
  modificarUsuario,
} = require("../../bd/controladores/usuarioController");
const { authMiddleware } = require("../middlewares");

const router = express.Router();

router.get("/cargar-informacion", authMiddleware, async (req, res, next) => {
  try {
    const { idUsuario } = req;
    const usuario = await obtenerUsuario(idUsuario);
    const nivelUsuario = await obtenerNivelUsuario(usuario.experiencia);
    const siguienteNivel = await obtenerSigueinteNivel(usuario.experiencia);
    const listadoFormaciones = await listarFormaciones();
    const listadoTrabajos = await listarTrabajos();
    res.json({
      usuario,
      nivelUsuario,
      listadoFormaciones,
      listadoTrabajos,
      siguienteNivel,
    });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/nombre-gato/:nombreGato",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { idUsuario } = req;
      const { nombreGato } = req.params;
      const usuarioModificado = await modificarUsuario(idUsuario, {
        gato: nombreGato,
      });
      res.json(usuarioModificado);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
