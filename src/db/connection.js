const mysql = require('mysql2/promise');
require('dotenv').config()
const user = process.env.DB_USUARIO;
const password = process.env.DB_SENHA;
const port = process.env.DB_PORTA;
const database = process.env.DB_BANCO;
const host = process.env.DB_IP;


const connection = mysql.createPool({
    host: host,
    user: user,
    password: password,
    port: port,
    database: database
});


module.exports = connection;