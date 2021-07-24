const morganFreeman = require("morgan");
const express = require("express");
const cors = require("cors");
const { app } = require("./init");
const rutasUsuario = require("./rutas/usuario");
const rutasHistorial = require("./rutas/historial");
const rutasCodecat = require("./rutas/codecat");
const rutasTrabajo = require("./rutas/trabajo");

const { errorGeneral, error404 } = require("./errores");

app.use(morganFreeman("dev"));
app.use(cors());
app.use(express.json());

// rutas
app.use("/codecat", rutasCodecat);
app.use("/usuarios", rutasUsuario);
app.use("/historial", rutasHistorial);
app.use("/trabajo", rutasTrabajo);

// errores
app.use(error404);
app.use(errorGeneral);
