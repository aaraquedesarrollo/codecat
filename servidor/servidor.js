const morganFreeman = require("morgan");
const express = require("express");
const cors = require("cors");
const { app } = require("./init");
const rutasTrabajo = require("./rutas/trabajo");
const rutasUsuario = require("./rutas/usuario");
const rutasTarea = require("./rutas/tarea");
const rutasNivel = require("./rutas/nivel");
const rutasHistorial = require("./rutas/historial");

const { errorGeneral, error404 } = require("./errores");

app.use(morganFreeman("dev"));
app.use(cors());
app.use(express.json());

// rutas
app.use("/trabajos", rutasTrabajo);
app.use("/usuarios", rutasUsuario);
app.use("/tareas", rutasTarea);
app.use("/niveles", rutasNivel);
app.use("/historial", rutasHistorial);

// errores
app.use(error404);
app.use(errorGeneral);
