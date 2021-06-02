import express from "express";
import ProductoController from "../controllers/ProductoController";
import UsuarioController from "../controllers/UsuarioController";
import MensajeController from "../controllers/MensajeController";

const route = express.Router();

route.get('/', ProductoController.index);
route.get('/usuarios-list', UsuarioController.list);
route.post('/new-message', MensajeController.newMessage);
route.post('/get-messages', MensajeController.getAllMessages);

module.exports = route;