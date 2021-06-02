import Carrera from "../models/Carrera";

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


module.exports = controller;