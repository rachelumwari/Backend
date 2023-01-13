import { request, response } from "express";
import Joi from "joi";

const blogValidation =(req, res, next)=>{
        
    const Schemas = Joi.object().keys({
      title:Joi.string().min(5).required(),
      content:Joi.string().min(5).required()
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

export default blogValidation