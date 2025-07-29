import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name : {
        type : String
    } , 
    email : {
        type : String ,
        unique : true,
        lowercase : true
    },
    contact : {
        type : String
    } ,
    password : {
        type : String
    }
})

export const Admin = mongoose.model("admin" , adminSchema)