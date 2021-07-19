const { Schema, model } = require("mongoose");

const RecompensaSchema = new Schema({
  chuches: Number,
  experiencia: Number,
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
  objetivos: [String],
});

const Tarea = model("Tarea", TareaSchema, "tarea");

module.exports = Tarea;
