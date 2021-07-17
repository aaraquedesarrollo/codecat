const { Schema, model } = require("mongoose");

const HashSchema = new Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  idUsuario: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
});

const Hash = model("Hash", HashSchema, "hash");

module.exports = Hash;
