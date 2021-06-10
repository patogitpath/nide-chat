import express from "express";
import ProductoController from "../controllers/ProductoController";
import UsuarioController from "../controllers/UsuarioController";
import MensajeController from "../controllers/MensajeController";

const route = express.Router();

route.get('/', ProductoController.index);
route.get('/usuarios-list', UsuarioController.list);
route.get('/edith-user/:id', UsuarioController.edithUser);
route.post('/edith-user-post/:id', UsuarioController.edithUserPost);
route.get('/delete-user/:id', UsuarioController.deleteUser);
route.post('/new-message', MensajeController.newMessage);
route.post('/get-messages', MensajeController.getAllMessages);
route.get('/new-user', UsuarioController.newUser);
route.post('/new-user-post', UsuarioController.newUserPost);
route.get('/delete-carrera/:id', ProductoController.deleteCarrera);
route.get('/carrera-new', ProductoController.newCarrera);
route.post('/new-carrera-post', ProductoController.newCarreraPost);
route.get('/carrera-edith/:id', ProductoController.edithCarrera);
route.post('/carrera-edith-post/:id', ProductoController.edithCarreraPost);

module.exports = route;