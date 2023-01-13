import {Router} from "express"
import userrouter from"./users.routers"
import blogrouter from"./blog.routers"


const router=Router();
router.use("/User",userrouter)        
router.use("/Blog",blogrouter) 


export default router