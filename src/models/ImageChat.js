import { model, Schema } from "mongoose";

const imageChat = new Schema({

    messageChat: {
        type: Schema.Types.ObjectId,
        ref: 'MessageChat'
    },
    url: {
        type: String,
        required: true
    }

});

export default model('ImageChat', imageChat);