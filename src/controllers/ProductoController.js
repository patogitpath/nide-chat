import Carrera from "../models/Carrera";
import Usuario from "../models/Usuario";

const controller = {};

controller.index = async (req, res) => {
    
    try {
        
        let data = await Carrera.find();
        let carreraArray = [];
        carreraArray = data;
        res.render('index', {
            message: 'mensaje desde el controller',
            carreraList: carreraArray
        });
        
    } catch (error) {
        
        console.log(error);

    }
    
};

controller.newCarrera = (req, res) => {

    res.render('carrera-new');

}

controller.edithCarreraPost = async (req, res) => {

    const { id } = req.params;
    const body = req.body;


    try {
        
        await Carrera.findByIdAndUpdate(id, body, { new: true });
        res.redirect('/');

    } catch (error) {
        
    }

}

controller.edithCarrera = async (req, res) => {


    const { id } = req.params;

    try {
        
        const data = await Carrera.findById(id);

        res.render('carrera-edith', {
            carrera: data,
            id: id
        });

    } catch (error) {
        
    }

}

controller.newCarreraPost = async (req, res) => {

    const body = req.body;

    try {
        
        const data = new Carrera(body);
        await data.save();

        res.redirect('/');

    } catch (error) {
        
    }

}

controller.deleteCarrera = async (req, res) => {

    const { id } = req.params;

    try {

        const data = await Carrera.findById(id);
        await Usuario.remove({ carrera: data._id });
        await Carrera.findByIdAndDelete(id);

        res.redirect('/');

    } catch (error) {
        
    }

}

module.exports = controller;