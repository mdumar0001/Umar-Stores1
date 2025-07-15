import mongoose from "mongoose";

const connectDb = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB CONNECTED");
  });
  await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`); //slash/ ke bad jo likhte hai to database create ho jata hai
};
export default connectDb;
