import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import connectDb from "./config/mongosb.js";
import connectCloudinary from "./config/cloudinary.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

//App config
const app = express();
const port = process.env.PORT || 4000;

connectDb();
connectCloudinary(); //configured
//middleware
app.use(express.json()); //request will be parse as json
app.use(cors());
//we can access backend from any ip
// app.use(express.urlencoded({ extended: true }));
//api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.user("/api/order", orderRouter);
app.get("/", (req, res) => {
  res.send("API eorking fine");
});

app.listen(port, () => console.log(`Server started on PORT :${port}`));
