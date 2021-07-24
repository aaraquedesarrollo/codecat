const { Schema, model } = require("mongoose");

const RecompensaSchema = new Schema({
  chuches: Number,
  experiencia: Number,
});

const ObjetivoSchema = new Schema({
  etiqueta: String,
  children: [],
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
  objetivos: ObjetivoSchema,
});

const Tarea = model("Tarea", TareaSchema, "tarea");

module.exports = Tarea;
