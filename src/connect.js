import mongoose from "mongoose";

async function connect() {


    try {
        
        await  mongoose.connect("mongodb://localhost/usuarios", {
            useNewUrlParser: false
        });
        console.log("database connect");

    } catch (error) {
        console.log(error);
        console.log("error");
    }

}

export default connect;