import Usuario from "../models/Usuario";
import Carrera from "../models/Carrera";

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

controller.newUser = async (req, res) => {

    try {
        
        const data = await Carrera.find();

        res.render('user-new', {
            carreras: data
        });

    } catch (error) {
        
    }
}

controller.newUserPost = async (req, res) => {

    const body = req.body;

    try {
        
        const data = new Usuario(body);
        await data.save();
        await Carrera.findByIdAndUpdate(data.carrera, {"$push": { "usuarios": data._id }});
        Carrera.updateOne

        res.redirect('/usuarios-list');

    } catch (error) {
        
    }
}

controller.edithUserPost = async (req, res) => {

    const { id } = req.params;
    const body = req.body;

    console.log(body);

    try {
        
        const dataUser = await Usuario.findById(id);

        if(dataUser.carrera !== body.carrera) {

            await Carrera.findByIdAndUpdate(dataUser.carrera, {"$pull": {"usuarios": dataUser._id }});
            await Carrera.findByIdAndUpdate(body.carrera, {"$push": {"usuarios": dataUser }});
        }

        await Usuario.findByIdAndUpdate(id, body, { new: true });

        res.redirect('/usuarios-list');

    } catch (error) {
        
    }

}

controller.deleteUser = async (req, res) => {

    const { id } = req.params;

    try {
        
        const data = await Usuario.findById(id);
        await Carrera.findByIdAndUpdate(data.carrera, {"$pull": { "usuarios": data._id }});
        await Usuario.findByIdAndDelete(id);

        res.redirect('/usuarios-list');

    } catch (error) {
        
    }

}

controller.edithUser = async (req, res) => {

    const { id } = req.params;

    try {
        
        let data = await Usuario.findById(id);
        let dataCarrera = await Carrera.find();

        res.render('user-edith', {
            user: data,
            carreras: dataCarrera,
            id: id
        });

    } catch (error) {
        
    }

}

module.exports = controller;
