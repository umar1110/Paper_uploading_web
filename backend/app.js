import express from "express";
const app = express()
import errorMiddleWare from "./middleware/error.js"
import cookieParser from "cookie-parser"


//MiddleWares
app.use(express.json())
app.use(express.urlencoded({extended:true,limit: "16kb"}))
app.use(express.static("./public"))
app.use(cookieParser())
//Routes 

import userRoutes  from "./routes/userRoute.js"
import journalRoutes from "./routes/journalRoute.js"

//Use Routes  
app.use("/api/v1",userRoutes)
app.use("/api/v1",journalRoutes)


// app.use((err,req,res,next)=>{

//   console.log(err)
//   res.status(400).json({
//     err,
//     errS:err.message,
//     success:false
//   })
// })

// Next middle ware when error occurs in catchasyncfuncerror 
app.use(errorMiddleWare)



// app.get("/",(req,res)=>{
//   res.status(200).send("hello world")
// })


//   // For Hosting 

import path from "path"

import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)
app.use(express.static(path.join(__dirname,"../frontend/build")))

app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
});




export default app;