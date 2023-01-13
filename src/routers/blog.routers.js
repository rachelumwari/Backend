import { Router } from "express";
const router =Router();
import BlogController from "../controls/BlogController";
import verifyToken from "../middelwares/verifyToken";
import isAdmin from "../middelwares/isAdmin";
import blogValidation from "../middelwares/blogValidation";
import{
    addBlogs,
    deleteBlog,
    UpdateBlog,
    getBlog,
    } from "../controls/BlogController";



/**
 * @swagger
 *
 * /Blog/addblog/:
 *    post:
 *      tags: [Admin Blogs]
 *      security:
 *         - BearerAuth: []
 *      summary: Create all Blogs
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/blog'
 *      responses:
 *        "201":
 *          description: All blog posts retrieved successfuly
 *        "400":
 *          description: Not blog post retrieved
 *        "500":
 *          description: There is an internal server error
 *
 * components:
 *    schemas:
 *      blog:
 *        type: object
 *        required:
 *          - title
 *          - content
 *        properties:
 *           title:
 *             type: string
 *             description: Blog title
 *             example: First blog
 *           content:
 *             type: string
 *             description: Blog content
 *             example: Hello World
 *
 */
router.post("/addblog",verifyToken,isAdmin,blogValidation,BlogController.addBlogs);

/**
 * @swagger
 *
 * /Blog/deleteblog/{id}:
 *    delete:
 *      tags: [Admin Blogs]
 *      security:
 *         - BearerAuth: []
 *      summary: Delete Blog
 *      parameters:
 *      - name: id
 *        in: path
 *      responses:
 *        "201":
 *          description: All blog posts retrieved successfuly
 *        "400":
 *          description: Not blog post retrieved
 *        "500":
 *          description: There is an internal server error
 *
 */
router.delete("/deleteblog/:id",verifyToken,isAdmin,BlogController.deleteBlog);

/**
 * @swagger
 *
* /Blog/updateblog/{id}:
 *    put:
 *      tags: [Admin Blogs]
 *      security:
 *         - BearerAuth: []
 *      summary: Modifty Blog
 *      parameters:
 *      - name: id
 *        in: path 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/blog'
 *            type: object 
 *            required:

 *      responses:
 *        "201":
 *          description: Modified
 *        "400":
 *          description: Bad Request
 *        "500":
 *          description: There is an internal server error
  * components:
 *    schemas:
 *      blog:
 *        type: object
 *        required:
 *          - title
 *          - content
 *        properties:
 *           title:
 *             type: string
 *             description: Blog title
 *             example: First blog
 *           content:
 *             type: string
 *             description: Blog content
 *             example: Hello World 
 *
 */

router.put("/updateblog/:id",verifyToken,isAdmin,BlogController.UpdateBlog);

/**
 * @swagger
 *
 * /Blog/getblog/:
 *    get:
 *      tags: [Admin Blogs]
 *      security:
 *         - BearerAuth: []
 *      summary: Get all Blogs
 *      responses:
 *        "201":
 *          description: All blog posts retrieved successfuly
 *        "400":
 *          description: Not blog post retrieved
 *        "500":
 *          description: There is an internal server error
 *
 */

router.get("/getblog",BlogController.getBlog);


// router.get("/total",BlogController.CountLikandComment);

router.get("/getblog/:id",);

export default router