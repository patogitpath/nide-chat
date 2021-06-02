import {  model, Schema } from "mongoose";

const carreraSchema = new Schema({

    nombre: {
        type: String,
        required: true
    },
    usuarios: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuarios'
    }]

});

export default model('Carrera', carreraSchema);