const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true, //Si se deben poner en espera las solicitudes si no hay conexiones disponibles.
    connectionLimit: 10, //Máximo número de conexiones simultáneas en el pool
    queueLimit: 0, //Máximo número de conexiones en espera (cola)
});

module.exports = pool;
