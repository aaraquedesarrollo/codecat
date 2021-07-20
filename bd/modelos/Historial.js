const { Schema, model } = require("mongoose");

const TrabajoHistorialSchema = new Schema({
  idTrabajo: { type: Schema.Types.ObjectId, unique: true },
  tareasCompletadas: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  trabajoCompletado: {
    type: Boolean,
    default: false,
  },
});

const HistorialSchema = new Schema({
  idUsuario: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  trabajos: { type: [TrabajoHistorialSchema], default: [] },
});

const Historial = model("Historial", HistorialSchema, "historial");

module.exports = Historial;
