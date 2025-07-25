const pool = require('../config/db');

async function getAllUsers() {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  } catch (err) {
    console.error('❌ Error en getAllUsers:', err);
    throw err;
  }
}

async function createUser(first_name, last_name, email, pass) {
  try {
    const [result] = await pool.query(
      'INSERT INTO users (first_name, last_name, email, pass) VALUES (?, ?, ?, ?)',
      [first_name, last_name, email, pass]
    );
    return { user_id: result.insertId, first_name, last_name, email };
  } catch (err) {
    console.error('❌ Error en createUser:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      const error = new Error('El correo ya está registrado');
      error.status = 409;
      throw error;
    }
    throw err;
  }
}

async function getUserByEmail(email) {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0]; // Retorna el primer usuario encontrado o undefined si no existe
  } catch (err) {
    console.error('❌ Error en getUserByEmail:', err);
    throw err;
  }
}

module.exports = { getAllUsers, createUser, getUserByEmail };
