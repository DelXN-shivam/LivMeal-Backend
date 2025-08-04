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
    } ,
    isRegistered : {
        type : Boolean,
        default: false
    },  
    favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mess'   // Make sure 'mess' matches your Mess model name
  }]
})

export const Student =  mongoose.model("student" ,studentSchema )