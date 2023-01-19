import { Router } from "express";
import UserControl from "../controls/UserControl";
import checkUser from "../middelwares/checkUser";
import isAdmin from "../middelwares/isAdmin";
import verifyToken from"../middelwares/verifyToken";
import signupValidation from"../middelwares/signupValidation";
import{
    signup,
    addBlogs,
    deleteBlog,
    UpdateBlog,
    getBlog,
    } from "../controls/UserControl";
const router =Router();


/**
 * @swagger
 *
 * /User/signup/:
 *    post:
 *      tags: [Authorization/Authentication]
 *      security:
 *         - BearerAuth: []
 *      summary: Create a Signup
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      responses:
 *        "201":
 *          description: Signup successfuly
 *        "400":
 *          description:  Bad request
 *        "500":
 *          description: There is an internal server error
 *
 * components:
 *    schemas:
 *      user:
 *        type: object
 *        required:
 *          - Fullname
 *          - email
 *          - password
 *        properties:
 *           Fullname:
 *             type: string
 *             description:  FullName SignUp
 *             example: Gloria Kyle
 *           email:
 *             type: string
 *             description: Email to Signup 
 *             example: gloria@gmail.com
 *           password:
 *             type: string
 *             description: Password to Signup 
 *             example: gloria123 
 *
 */
router.post("/signup",signupValidation,UserControl.signup)


/**
 * @swagger
 *
 * /User/getUsers/:
 *    get:
 *      tags: [Users]
 *      security:
 *         - BearerAuth: []
 *      summary: Get all Users
 *      responses:
 *        "201":
 *          description: All Users retrieved successfuly
 *        "400":
 *          description: Bad request
 *        "500":
 *          description: There is an internal server error
 *
 */
router.get("/getUsers",UserControl.getUsers)

/**
 * @swagger
 *
* /User/UpdateUser/{id}:
 *    put:
 *      tags: [Users]
 *      security:
 *         - BearerAuth: []
 *      summary: Modifty User
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
 *      user:
 *        type: object
 *        required:
 *          - Fullname
 *          - email
 *          - password
 *        properties:
 *           Fullname:
 *             type: string
 *             description: User FullName
 *             example: Rachel UMWARI
 *           email:
 *             type: string
 *             description: Email of User
 *             example:  rachelumwari@gmail.com
 *           password:
 *             type: string
 *             description: Password of User
 *             example:  HaNeYe
 *
 */

router.put("/UpdateUser/:id",UserControl.UpdateUser)

/**
 * @swagger
 *
 * /User/deleteUser/{id}:
 *    delete:
 *      tags: [Users]
 *      security:
 *         - BearerAuth: []
 *      summary: Delete User
 *      parameters:
 *      - name: id
 *        in: path
 *      responses:
 *        "201":
 *          description: Delete user successfuly
 *        "400":
 *          description: Bad request
 *        "500":
 *          description: There is an internal server error
 *
 */


router.delete("/deleteUser/:id",verifyToken,isAdmin,UserControl.deleteUser)
router.get("/findUserById/:id",UserControl.findUserById)

/**
 * @swagger
 *
 * /User/Login/:
 *    post:
 *      tags: [Authorization/Authentication]
 *      summary: user login
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      responses:
 *        "201":
 *          description: All blog posts retrieved successfuly
 *        "400":
 *          description: Bad request
 *        "500":
 *          description: There is an internal server error
 *
 * components:
 *    schemas:
 *      user:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *           email:
 *             type: string
 *             description: user email
 *             example: rachel@admin.com
 *           password:
 *             type: string
 *             description:  password
 *             example: password
 *
 */
router.post("/Login",checkUser,UserControl.Login)



/**
 * @swagger
 *
 * /User/like/{id}:
 *    post:
 *      tags: [Users]
 *      security:
 *         - BearerAuth: []
 *      summary: like blog
 *      parameters:
 *      - name: id
 *        in: path
 *      responses:
 *        "201":
 *          description: like blog successfuly
 *        "400":
 *          description: Bad request
 *        "500":
 *          description: There is an internal server error
 *
 */

router.post("/like/:id",UserControl.Like)

/**
 * @swagger
 *
 * /User/comment/{id}:
 *    post:
 *      tags: [Users]
 *      security:
 *         - BearerAuth: []
 *      summary: comment blog
 *      parameters:
 *      - name: id
 *        in: path
 *      responses:
 *        "201":
 *          description: comment blog successfuly
 *        "400":
 *          description: Bad request
 *        "500":
 *          description: There is an internal server error
 *
 */


router.post("/comment/:id",UserControl.Comment)

router.get("/getblog/:id",UserControl.getBlogId)


export default router                                     

