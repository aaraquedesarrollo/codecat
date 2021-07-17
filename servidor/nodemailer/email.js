require("dotenv").config();
const debug = require("debug")("codeCatAPI:servidor:nodemailer");
const chalk = require("chalk");
const nodemailer = require("nodemailer");
const { crearError } = require("../errores");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.CODECAT_MAIL,
    pass: process.env.CODECAT_MAIL_PASS,
  },
});

const enviarCorreoValidacion = async (destinatario, hash) => {
  const mensaje = {
    from: "codecat.productions@gmail.com",
    to: destinatario,
    subject: "Confirmación de email en CodeCat 🐱",
    html: `Por favor, haz click en el siguiente link para confirmar tu dirección de email: ${process.env.URL_API}usuarios/confirmar-email/${hash}`,
  };
  transport.sendMail(mensaje, (err, info) => {
    if (err) {
      debug(chalk.redBright.bold("No he podido enviar el correo"));
      debug(chalk.redBright.bold(err.message));
      throw crearError("No se ha podido enviar el correo");
    } else {
      debug(chalk.green("Correo enviado correctamente"));
    }
  });
};

module.exports = {
  enviarCorreoValidacion,
};
