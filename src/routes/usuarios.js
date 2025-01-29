const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Usuario = require('../models/usuario');

const SECRET_KEY = process.env.JWT_SECRET || 'secreto'; // Clave secreta para JWT

const Notificacion = require('../models/notificacion');

router.get('/notificaciones/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const notificaciones = await Notificacion.find({
      torre: usuario.torre,
      departamento: usuario.departamento
    });

    res.status(200).json(notificaciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener notificaciones', error });
  }
});


// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { numero_tel, contrasena } = req.body;
    const usuario = await Usuario.findOne({ numero_tel, contrasena });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Número de teléfono o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, SECRET_KEY, { expiresIn: '2h' });
    res.status(200).json({
      id: usuario._id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.rol,
      token
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
});

module.exports = router;
