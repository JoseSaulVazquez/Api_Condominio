const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  numero_tel: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  contrasena: { type: String, required: true },
  rol: { type: String, required: true },
  torre: { type: String },
  departamento: { type: String },
  tokens: [{ type: String }]  // Nuevo campo para almacenar múltiples tokens
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
