import Mess from "../models/Mess.js";


export const messRegister = async (req , res) => {
    try{
        const body = req.body;

    if(!body){
        return res.status(411).json({
            message : "Please pass in the body"
        })
    }

    const existingMess = await Mess.findOne({email : body.email});

    if(existingMess){
        return res.status(409).json({
            message : "Mess User already exists , please login"
        })
    }

    const newMess = await Mess.create(body);

    return res.status(200).json({
        message : "New Mess User registered successfully",
        data : newMess
    })
    
    } catch (err){
        console.error(err);
        res.status(500).json({
            message : "Error while registering Mess",
            error : err.message
        })
    }
}