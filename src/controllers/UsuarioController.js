import Usuario from "../models/Usuario";

const controller = {};


controller.list = async (req, res) => {

    try {
        
        let data = await Usuario.find();
        let usuariosList = [];
        usuariosList = data;

        res.render('usuarios-list', {
            usuariosList: usuariosList
        });

    } catch (error) {
        
    }

}

module.exports = controller;
