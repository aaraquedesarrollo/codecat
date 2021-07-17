require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  crearUsuario,
  loginUsuario,
  confirmarHash,
} = require("../../bd/controladores/usuarioController");
const { enviarCorreoValidacion } = require("../nodemailer/email");

const router = express.Router();

router.post("/registro", async (req, res, next) => {
  try {
    const usuario = req.body;
    const usuarioCreado = await crearUsuario(usuario);
    res.status(201).json(usuarioCreado);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
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
});

router.get("/confirmar-email/:hashUsuario", async (req, res, next) => {
  try {
    const { hashUsuario } = req.params;
    await confirmarHash(hashUsuario);
    res.redirect(process.env.URL_FRONT);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
