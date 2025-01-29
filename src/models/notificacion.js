const mongoose = require("mongoose");

const NotificacionSchema = new mongoose.Schema(
  {
    torre: { type: String, required: true },
    departamento: { type: String, required: true },
    mensaje: { type: String, required: true },
  },
  {
    timestamps: true, // Agrega timestamps para saber cuándo fue creada la notificación
  }
);

module.exports = mongoose.model("Notificacion", NotificacionSchema);
