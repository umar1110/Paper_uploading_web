import dotenv from "dotenv"

dotenv.config({
  path : "./backend/config/config.env"
})
import {v2 as cloudinary} from 'cloudinary';
import app from "./app.js"
import connectDatabase from "./db/dataBase.js"

const port = parseInt(process.env.PORT) || 3000;

   
try {

  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key:  process.env.CLOUDINARY_API_KEY, 
    api_secret:  process.env.CLOUDINARY_SECRET 
  });
  
}
catch(error){
  console.log("Cloudinary Connect Error : ",error)
}

  


connectDatabase()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})

// Unhandled Promise Rejection
// For if the mongo db link is not true and failed to connect not using .catch because it should not be handeled and server should close 
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting Down the server due to Unhandled Promise Rejection ')

  server.close(() => {
      process.exit(1)
  })
})