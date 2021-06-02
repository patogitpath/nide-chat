import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    carrera: {
        type: Schema.Types.ObjectId,
        ref: 'Carrera'
    }
});

export default model('Usuario', UsuarioSchema);