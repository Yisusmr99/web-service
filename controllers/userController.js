const userModel = require('../models/userModel');

const getUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

const addUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const newUser = await userModel.createUser(name, email);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};

module.exports = { getUsers, addUser };
