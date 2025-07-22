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
    const { name, email } = req.body;
    try {
        const newUser = await userModel.createUser(name, email);
        res.status(201).json(getResponse(newUser));
    } catch (err) {
        res.status(500).json(getResponse(null, 'Error al crear usuario', 'error'));
    }
};

module.exports = { getUsers, addUser };
