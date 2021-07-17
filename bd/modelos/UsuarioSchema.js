const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  chuches: Number,
  experiencia: Number,
  activo: {
    type: Boolean,
    required: true,
    default: false,
  },
  trabajo: Schema.Types.ObjectId,
  gato: Schema.Types.ObjectId,
});

const Usuario = model("Usuario", UsuarioSchema, "usuario");

module.exports = Usuario;
