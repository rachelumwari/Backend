import express from "express";
import cors from "cors";
import routers from "./routers";
import swaggerDocs from "../swagger.js";

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors())
app.use(routers)

const port =process.env.PORT || 8000;
// const port =1000;
app.listen(port, ()=>{
    console.log(`server is read on port http://localhost:${port}`)
    swaggerDocs(app, port);
});

export default app
