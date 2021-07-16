const { Schema, model } = require("mongoose");

const RecompensaSchema = new Schema({
  chuches: {
    type: Number,
    required: true,
  },
  experiencia: {
    type: Number,
    required: true,
  },
});

const ObjetivoSchema = new Schema({
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
  recompensa: RecompensaSchema,
  completada: {
    type: Boolean,
    default: false,
  },
  objetivos: [ObjetivoSchema],
});

const Tarea = model("Tarea", TareaSchema, "tarea");

module.exports = Tarea;
