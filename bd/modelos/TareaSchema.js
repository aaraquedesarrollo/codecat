const { Schema, model } = require("mongoose");

const recompensaSchema = new Schema({
  chuches: {
    type: Number,
    required: true,
  },
  experiencia: {
    type: Number,
    required: true,
  },
});

const objetivosSchema = new Schema({
  objetivo: {
    type: String,
    required: true,
  },
  correcto: {
    type: Boolean,
    default: false,
  },
});

const TareaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  recompensa: recompensaSchema,
  completada: {
    type: Boolean,
    default: false,
  },
  objetivos: [objetivosSchema],
});

const Tarea = model("Tarea", TareaSchema, "tarea");

module.exports = Tarea;
