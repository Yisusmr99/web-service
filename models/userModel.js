const pool = require('../config/db');

/*async function getAllUsers() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
}
    */

async function getAllUsers() {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        return rows;
    } catch (err) {
        console.error('Error en getAllUsers:', err);
        throw err; // it launches it again to reach the controller
    }
}

async function createUser(first_name, last_name, email, pass) {
    const [result] = await pool.query(
        'INSERT INTO users (first_name, last_name, email, pass) VALUES (?, ?, ?, ?)',
        [first_name, last_name, email, pass]
    );
    return { user_id: result.insertId, first_name, last_name, email };
}

module.exports = { getAllUsers, createUser };
