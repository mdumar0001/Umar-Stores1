import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false } //whenever we create the user using mongoose,when we create a data with empty object
  //then this data will not be displayed in mongodb so we use minimize so it will create a use data with empty object
);

//creating model with this schema

const userModel = mongoose.models.user || mongoose.model("user", userModel);

export default userModel;
