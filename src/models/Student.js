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
    imgUrl : {
        type : String
    },
    isRegistered : {
        type : Boolean,
        default: false
    },  
    subscribedMess : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mess'   
    }],
    subscription : [{
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'Subscription' 
    }],
    favorites: [{
    
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mess'   
  }]
})

export const Student =  mongoose.model("student" ,studentSchema )