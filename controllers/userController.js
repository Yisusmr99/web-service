const userModel = require('../models/userModel');

function getResponse(data, message, status) {
  return {
    status: status || 'success',
    message: message || 'Operación exitosa',
    data: data || null
  };
}

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(getResponse(users));
  } catch (err) {
    console.error(err);
    res.status(500).json(getResponse(null, 'Error al obtener usuarios', 'error'));
  }
};

const addUser = async (req, res) => {
  const { first_name, last_name, email, pass } = req.body;

  // ✅ Validación de campos requeridos
  if (!first_name || !last_name || !email || !pass) {
    return res
      .status(400)
      .json(getResponse(null, 'Todos los campos son requeridos', 'error'));
  }

  try {
    const newUser = await userModel.createUser(first_name, last_name, email, pass);
    res.status(201).json(getResponse(newUser));
  } catch (err) {
    if (err.status === 409) {
      // Email duplicado
      res.status(409).json(getResponse(null, err.message, 'error'));
    } else {
      console.error(err);
      res.status(500).json(getResponse(null, 'Error al crear usuario', 'error'));
    }
  }
};

module.exports = { getUsers, addUser };
