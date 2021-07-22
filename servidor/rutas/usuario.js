require("dotenv").config();
const express = require("express");
const { body, check } = require("express-validator");
const jwt = require("jsonwebtoken");
const {
  crearUsuario,
  loginUsuario,
  confirmarHash,
  generarNuevaContrasenya,
  modificarUsuario,
} = require("../../bd/controladores/usuarioController");
const { validarErrores, authMiddleware } = require("../middlewares");
const { enviarCorreoNuevaContrasenya } = require("../nodemailer/email");

const router = express.Router();

router.post(
  "/registro",
  body("nombre", "Nombre incorrecto").isAlpha(),
  body("username", "Nombre de usuario incorrecto").isAlphanumeric(),
  body("email", "Direccion de email incorrecta").isEmail(),
  validarErrores,
  async (req, res, next) => {
    try {
      const usuario = req.body;
      const usuarioCreado = await crearUsuario(usuario);
      res.status(201).json(usuarioCreado);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/login",
  body("username", "Nombre de usuario incorrecto").isAlphanumeric(),
  validarErrores,
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const idUsuario = await loginUsuario(username, password);
      const token = jwt.sign({ idUsuario }, process.env.SECRET_JWT, {
        expiresIn: "1d",
      });
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/confirmar-email/:hashUsuario",
  check("hashUsuario", "Hash incorrecto").isHexadecimal(),
  validarErrores,
  async (req, res, next) => {
    try {
      const { hashUsuario } = req.params;
      await confirmarHash(hashUsuario);
      res.redirect(process.env.URL_FRONT);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/enviar-nueva-contrsenya/:email",
  check("email", "Direccion de email incorrecta").isEmail(),
  validarErrores,
  async (req, res, next) => {
    try {
      const { email } = req.params;
      enviarCorreoNuevaContrasenya(email);
      res.json({ error: false, mensaje: "Correo enviado" });
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/generar-contrasenya/:email",
  check("email", "Direccion de email incorrecta").isEmail(),
  validarErrores,
  async (req, res, next) => {
    try {
      const { email } = req.params;
      await generarNuevaContrasenya(email);
      res.json({ error: false, mensaje: "Contrasenya cambiada" });
    } catch (err) {
      next(err);
    }
  }
);
router.put("/modificar", authMiddleware, async (req, res, next) => {
  try {
    const { idUsuario } = req;
    const modificaciones = req.body;
    const usuarioModificado = await modificarUsuario(idUsuario, modificaciones);
    res.json(usuarioModificado);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
