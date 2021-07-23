const express = require("express");
const { check } = require("express-validator");
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
const { authMiddleware, validarErrores } = require("../middlewares");

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
  check("nombreGato")
    .isLength({ min: 3 })
    .withMessage("El nombre del gato debe tener al menos 3 caracteres")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("El nombre solo puede contener letras y espacios"),
  validarErrores,
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
