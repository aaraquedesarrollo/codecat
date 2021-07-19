const { Schema, model } = require("mongoose");

const NivelSchema = new Schema({
  nivel: {
    type: Number,
    required: true,
  },
  experiencia: {
    type: Number,
    required: true,
  },
});

const Nivel = model("Nivel", NivelSchema, "nivel");

module.exports = Nivel;
