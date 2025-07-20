const pool = require('../config/db');

async function getAllUsers() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
}

async function createUser(name, email) {
    const [result] = await pool.query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email]
    );
    return { id: result.insertId, name, email };
}

module.exports = { getAllUsers, createUser };