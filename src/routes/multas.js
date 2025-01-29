const express = require("express");
const router = express.Router();
const Multa = require("../models/multa");
const Notificacion = require("../models/notificacion"); // Importar modelo de notificación

module.exports = (io) => {
  // Ruta para crear una nueva multa
  router.post("/multas", async (req, res) => {
    try {
      const { cantidad, torre, departamento, comentarios } = req.body;

      // Guardar la multa en la colección "multas"
      const nuevaMulta = new Multa({ cantidad, torre, departamento, comentarios });
      const multaGuardada = await nuevaMulta.save();

      // Crear y guardar una notificación en la colección "notificaciones"
      const nuevaNotificacion = new Notificacion({
        torre,
        departamento,
        mensaje: `Se ha registrado una multa de $${cantidad}. Comentarios: ${comentarios}`,
      });
      await nuevaNotificacion.save();

      // Emitir evento de notificación a los clientes conectados
      io.emit("nuevaMulta", { torre, departamento, cantidad, comentarios });

      res.status(201).json(multaGuardada);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al guardar la multa", error });
    }
  });

  return router;
};
