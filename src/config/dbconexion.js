const mysql = require("mysql2");
const dbkeys = require("./dbkeys.js");


// Creando conexion a Base de datos
const conexion = mysql.createConnection({
  host: dbkeys.host,
  user: dbkeys.user,
  password: dbkeys.password,
  database: dbkeys.database,
})

module.exports = conexion;
