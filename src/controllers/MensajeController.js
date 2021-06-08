import MessageChat from "../models/MessageChat";
import path from "path";
import ImageChat from "../models/ImageChat";

const controller = {};

controller.newMessage = async (req, res) => {

    const dataMensajes = await MessageChat.find();

    const data = req.body;

    let counter = !dataMensajes.length ? 1 : dataMensajes.length + 1;

    data.counter = counter;

    const newMessage = new MessageChat(data);
    await newMessage.save();

    if(req.files) {

        var file = req.files.file;
        var fileName = file.name;

        file.mv(path.join(__dirname, '../public/images/', fileName), async (err) => {
            
            if(err) {
                console.log(err);
            }

            var dataImage = {};
            dataImage.messageChat = newMessage._id;
            dataImage.url = fileName;

            const newImageChat = new ImageChat(dataImage);
            await newImageChat.save();


        });

    }

    res.json({
        message: newMessage
    });

}


controller.getAllMessages = async (req, res) => {

    let messageArray = [];

    const { id } = req.body;

    const data = await MessageChat.find({ counter: { $gt: id }});

    for(let i = 0; i < data.length; i++) {

        const dataImage = await ImageChat.find({ messageChat: data[i]._id });
        messageArray.push({ message: data[i], images: dataImage });
    }

    res.json({
        messages: data,
        messagesArray: messageArray
    });
}

module.exports = controller;