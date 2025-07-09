import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";

//App config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json()); //request will be parse as json
app.use(cors); //we can access backend from any ip

//api endpoints
app.use("/api/user", userRouter);
app.user("/api/product", productRouter);
app.get("/", (req, res) => {
  res.send("API eorking fine");
});

app.listen(port, () => console.log(`Server started on PORT :${port}`));
