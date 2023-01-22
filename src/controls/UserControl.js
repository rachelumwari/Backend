import Models from  "../db/models"
import {encode, decode} from "../helper/jwtTokenize"
import bcrypt from "bcrypt"
import { Sequelize, where } from "sequelize";

const {users,blogs,likes,comments}=Models;  

class UserControl{

static async signup(req,res){
    try {
       
        const {Fullname,email,role,password}=req.body
         const hash = await bcrypt.hashSync(password, 10);
       const checkUser=await users.findOne({
           where:{email:email}
       });
       if(checkUser){
           return res.status(400).json({
               status:400,
               message:"Bad request"
           })
       }
       else{
        const createData=await users.create({
            Fullname,
            email,
            role:"User",
            password:hash
          
        });
        const user =await users.findOne({where:{email:email},attributes: ['id','Fullname','email','role']},
        );
        res.status(200).json({
            status:200,
            message:"account created successfully",
            data:user
        })
       }
    } catch (error) {
        res.status(500).json({
            status:500,
            message:"Server error :" +error.message
        })
        
    }
}


static async Like(req,res){
    try {
        const modelid = req.params.id
        const findBlog = await blogs.findOne({
            where: {id:modelid}
        });
          
        if(findBlog){
            const findData = await likes.findOne({
                where: {blogId:modelid}
            });
            if(findData){
                
                let like = findData.like+1
                 const updatedata = await likes.update({
                     like:like
                     
                 }, {where: {blogId:modelid}, returning: true })
     
                 res.status(200).json({
                     status: 200,
                     message:"like and update complent",
                     data:updatedata
                 });
            }
            else{

                const createLike = await likes.create({
                    like:1,
                    blogId:modelid
                })
            }
        }else{

            res.status(404).json({
                status: 404,
                message:"Blog not found",
                // data:createLike
            });
        }
    } catch (error) {
        res.status(500).json({
            status:500,
            message:"Server error :" +error.message
        })
        
    }
}

static async Comment(req,res){
    try {
        const modelid = req.params.id
        const {comment,name}= req.body    
        const findData = await comments.create({
            name,
            comment,
            blogId:modelid
        });

        res.status(200).json({
            status: 200,
            message:"comment added successfuly",
            data:findData
        });
    } catch (error) {
        res.status(500).json({
            status:500,
            message:"Server error :" +error.message
        })
        
    }
}



static async getUsers(req, res) {
    try {
      const user =await users.findAll();
     return res.status(200).json({
        responseCode:200,
        status: 'Success',
        data: user,
      });
    } catch (error) {
     return res.status(500).json({
        responseCode:500,
        status: 'Failed',
        message: error.message 
        });
    }
  }

  static async deleteUser(req, res){
    try {
        const modelId = req.params.id
        const findUser = await users.findOne({
            where: { id: modelId}
        });
        if(findUser){
            const deleteDate = await users.destroy({
                where: {id:modelId}
            });
            res.status(200).json({
                status: 200,
                message:"User Account Deleted",
            });
        }
        else{
            res.status(404).json({
                status:404,
                message:"The requested resource does not exist"
            })
        }            
    } catch (error) {
        res.status(500).json({
            status:500,
            message:"server problen :" + error.message
        });
    }
}

static async UpdateUser(req, res){
    try {
        const modelid = req.params.id
        const {Fullname,email,username,password}= req.body    
        const findData = await users.findOne({
            where: {id:modelid}
        });
        if(findData){
            const updatedata = await users.update({
                Fullname,
                email,
                username,
                password
                
            }, {where: {id:modelid}, returning: true })
            res.status(200).json({
                status: 200,
                message:"User account update",
                data:updatedata
            });
        }else{
            res.status(404).json({
                stastus:404,
                message:"The requested resource does not exist"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message:"Server problem"+ error.message
        })
    }
}

static async findUserById(req,res){
    try {
     
        const modelId = req.params.id
      const UserData=await users.findOne({
        where:{id:modelId}
      })
      if(UserData){
  return res.status(200).json({
    responseCode:200,
    status:"successs",
    data:UserData
  })
      }
      return res.status(400).json({
        responseCode:400,
        status:"failed",
        message:"Bad request"
      })
        
    } catch (error) {
        return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message 
            });  
    }
}

static async Login(req, res){
        try {
            const {email,password}=req.body
            const findUser = await users.findOne({
                where: {email:email},
                attributes: ['id','Fullname','email','role']
            })
            if(!req.user){
                res.status(404).json({
                    status: 404,
                    message:"The requested resource does not exist"
                })
            }
            else{
                const dbEmail = req.user.email
                const dbPassword = req.user.password
                const dbRole= req.user.role
                const decreptedPassword = await bcrypt.compare(password, dbPassword)
                console.log(dbEmail,decreptedPassword,dbRole);

                if(dbEmail == email){
                    if(decreptedPassword){
                        const token=await encode({
                            email,
                            dbRole,
                          
                            
                        });
                        // const {findUser} = {...others,password}
                        return res.status(200).json({
                            stastus: 200,
                            message: "Login succefull ",
                            data:findUser,
                            token:token

                        });
                    }
                    else{
                        return res.status(400).json({
                            stastus: 400,
                            message: "Bad request",
                            data:findUser,
                            token:token

                        });
                    

                    }
                }
                    else{
                        return res.status(400).json({
                            stastus: 400,
                            message: "Bad request",
                            data:findUser,
                            token:token

                        });
                    
                    }   
                 }
            
        } catch (error) {
            res.status(500).json({
                stastus: 500,
                message:"server problem" +error.message
            })
        }
    }

    static async getBlogId(req, res){
        try {
            const modelId =req.params.id
            const UserData=await blogs.findOne({
                where:{id:modelId}
              })
              return res.status(200).json({
                responseCode:200,
                status:"successs",
                data:UserData
              })
          } catch (error) {
            return res.status(500).json({
                responseCode:500,
                status: 'Failed',
                message: error.message 
                });
          }
        }
}


export default UserControl;