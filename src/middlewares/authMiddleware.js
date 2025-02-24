const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const SECRET_KEY = process.env.JWT_SECRET || 'secreto';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó token.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const usuario = await Usuario.findById(decoded.id);

    if (!usuario || !usuario.tokens.includes(token)) {
      return res.status(401).json({ mensaje: 'Token inválido o sesión cerrada.' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ mensaje: 'Token inválido.' });
  }
};


module.exports = authMiddleware;
