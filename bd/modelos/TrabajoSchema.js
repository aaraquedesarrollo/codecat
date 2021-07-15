const { Schema, model } = require("mongoose");

const TrabajoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  tareas: [Schema.Types.ObjectId],
  formacion_minima: {
    type: Number,
    required: true,
  },
  completado: {
    type: Boolean,
    default: false,
  },
});

const Trabajo = model("Trabajo", TrabajoSchema, "trabajo");

module.exports = Trabajo;
