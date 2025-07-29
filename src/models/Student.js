import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name : {
        type : String
    } , 
    email : {
        type : String,
        unique : true,
        lowercase : true
    } , 
    contact : {
        type : String
    }, 
    gender : {
        type : String,
        enum : ['male' , 'female']
    }
})

export const Student =  mongoose.model("student" ,studentSchema )