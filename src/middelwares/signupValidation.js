import { request, response } from "express";
import Joi from "joi";

const signupValidation =(req, res, next)=>{
        
    const Schemas = Joi.object().keys({
      Fullname:Joi.string().min(3).max(20).required(),
      email:Joi.string().min(6).required(),
      password:Joi.string().min(6).max(6).required()
    });
    const {error} = Schemas.validate(req.body)
    if(error){
        return res.status(400).json({
            status:400,
            error:error.details[0].message
        });
    }
    next()

}

export default signupValidation