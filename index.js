require("./servidor/servidor");
const { iniciarServidor } = require("./servidor/init");
const conectarMongo = require("./bd/conexion");

conectarMongo(iniciarServidor);
