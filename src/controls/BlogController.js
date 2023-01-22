import Models from  "../db/models"
const {blogs,comments}=Models;  
import { Sequelize } from "sequelize";

class BlogController{

static async addBlogs(req,res){
    try {
        const {title,content}=req.body
        const createdata= await blogs.create({
            title,
            content
          
        })
        res.status(200).json({
            status:200,
            message:"blogs created successfully",
            data:createdata
        })
    } catch (error) {
        res.status(500).json({
            status:500,
            message:"Server error :" +error.message
        })
    }
    try {
        const modelId = req.params.id
        const findBlog = await blogs.findOne({
            where: { id: modelId}
        });
        if(findBlog){
            const deleteDate = await blogs.destroy({
                where: {id:modelId}
            });
            res.status(200).json({
                status: 200,
                message:"Blog Deleted",
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
            message:"Server error :" +error.message
        })
    }
}

static async UpdateBlog(req, res){
    try {
    
        const modelid = req.params.id
        const {title,content}= req.body    
        const findData = await blogs.findOne({
            where: {id:modelid}
        });
        if(findData){
            const updatedata = await blogs.update({
              title,
              content
                
            }, {where: {id:modelid}, returning: true })
            res.status(200).json({
                status: 200,
                message:"Blog update",
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
            status:500,
            message:"Server error :" +error.message
        })
    }

}

static async getBlog(req, res) {
    try {
      const blog =await blogs.findAll();
     return res.status(200).json({
        responseCode:200,
        status: 'Success',
        data: blog,
      });
    } catch (error) {
     return res.status(500).json({
        responseCode:500,
        status: 'Failed',
        message: error.message 
        });
    }
  }


  static async deleteBlog(req, res){
    try {
        const modelId = req.params.id
        const findBlog = await blogs.findOne({
            where: { id: modelId}
        });
        if(findBlog){
            const deleteDate = await blogs.destroy({
                where: {id:modelId}
            });
            res.status(200).json({
                status: 200,
                message:"Blog Deleted Successful",
            });
        }
        else{
            res.status(400).json({
                status:400,
                message:"Bad request"
            })
        }            
    } catch (error) {
        res.status(500).json({
            status:500,
            message:"server problen :" + error.message
        });
    }
}

static async getBlogId(req, res){
    try {
        const modelId =req.params.id
        const BlogData=await blogs.findOne({
            where:{id:modelId},
            include: {
                model: comments,
                as:"comments"
              },
          })
          return res.status(200).json({
            responseCode:200,
            status:"successs",
            data:BlogData
          })
      } catch (error) {
        return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message 
            });
      }
    }

//   static async CountLikandComment(req,res){
//     try {   
           
//             // const schoolId = req.params.id;
//             const Results = await blogs.findAll({
//               attributes: [
//                 "id",
      
//                 [Sequelize.fn("sum", Sequelize.col("like")), "total"],
//                 [Sequelize.fn("COUNT", Sequelize.col("id")), "numberoflike"],
//               ],
//               group: ["id", "id"],
//               raw: true,
              
//                 where:{like:"like"},
              
//               order: Sequelize.literal("total DESC"),
//               include: [
//                 { model: blogs, attributes: ["title"], json: true },
                
                    
//                     ],
//                     // }]
//                   });
//                   if (Results) {
//                     console.log(Results);
//                     return res.status(200).json({
//                       status: 200,
//                       message: "female with total",
//                       data: Results,
//                     });
//                   }
//                   return res.status(404).json({
//                     status: 404,
//                     message: "No Data Found",
//                   });
//       } catch (error) {
//        return res.status(500).json({
//           responseCode:500,
//           status: 'Failed',
//           message: error.message 
//           });
//       }
      
// }

}
export default BlogController