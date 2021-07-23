const { Schema, model } = require("mongoose");
const Tarea = require("./Tarea");

const TrabajoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  tareas: { type: [Schema.Types.ObjectId], ref: "Tarea" },
  nivel_minimo: {
    type: Number,
    required: true,
  },
  salario: Number,
});

const Trabajo = model("Trabajo", TrabajoSchema, "trabajo");

module.exports = Trabajo;
