import { Schema, model } from "mongoose";

const mensageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    counter: {
        type: Number,
        required: false
    }
});

export default model('MessageChat', mensageSchema);