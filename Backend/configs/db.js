import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("Database is connected")
    );
        await mongoose.connect(`${process.env.MONGODB_URI}/MeubelHouse`);
    } catch (error) {
        console.error(error.message);
    }
}


// import mongoose from "mongoose";
export default connectDB;
