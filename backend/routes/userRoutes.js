import expres from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
} from "../controllers/userControllers";
const userRouter = expres.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

export default userRouter;
