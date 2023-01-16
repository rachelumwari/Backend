import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken=async(req, res, next)=>{
try {

  const token=req.headers['authorization']
  const auth = token.split(" ")[1]
  // const token=authHeader && authHeader.split('')[1]
  if (!auth) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(auth, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
     
    }
    return next();
  
} catch (error) {
  return res.status(403).send("Token not provided");
  
}
 

}

export default verifyToken;