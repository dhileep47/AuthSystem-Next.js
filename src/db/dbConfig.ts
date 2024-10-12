import { error } from "console";
import mongoose from "mongoose";


export default function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("DB connected Succesfully");  
        })
        connection.on('error',(err)=>{
            console.log(err);
            process.exit();
        })
        
    } catch (error) {
        console.log("Something goes wrong");
        console.log(error);      
    }

}