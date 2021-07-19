const { Schema, model } = require("mongoose");

const HistorialSchema = new Schema({
  idUsuario: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  trabajos: [Schema.Types.ObjectId],
});

const Historial = model("Historial", HistorialSchema, "historial");

module.exports = Historial;
