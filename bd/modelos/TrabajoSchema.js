const { Schema, model } = require("mongoose");
const Tarea = require("./TareaSchema");

const TrabajoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  tareas: { type: [Schema.Types.ObjectId], ref: "Tarea" },
  formacion_minima: {
    type: Number,
    required: true,
  },
  completado: {
    type: Boolean,
    default: false,
  },
  salario: {
    type: Number,
    required: true,
  },
});

const Trabajo = model("Trabajo", TrabajoSchema, "trabajo");

module.exports = Trabajo;
