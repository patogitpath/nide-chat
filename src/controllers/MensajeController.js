import MessageChat from "../models/MessageChat";

const controller = {};

controller.newMessage = async (req, res) => {

    const dataMensajes = await MessageChat.find();

    const data = req.body;

    let counter = !dataMensajes.length ? 1 : dataMensajes.length + 1;

    data.counter = counter;

    const newMessage = new MessageChat(data);
    await newMessage.save();


    res.json({
        message: newMessage
    });

}


controller.getAllMessages = async (req, res) => {

    const { id } = req.body;

    const data = await MessageChat.find({ counter: { $gt: id }});

    res.json({
        messages: data
    });
}

module.exports = controller;