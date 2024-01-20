import mongoose from "mongoose"

const connectDatabase =async () => {
    try {
       await mongoose.connect(`${process.env.DB_URI}/Journal`)
        .then((data) => console.log(`Database Connected with server ${data.connection.host}!`))  

    } catch (error) {
        console.log("Error while database Connecting : ",error)
        process.exit(1);
    }
   
}


export default connectDatabase;