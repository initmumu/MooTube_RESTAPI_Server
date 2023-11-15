import { Router } from "express";
import { isIdExistController, loginController, registerAccountController } from "../controller/user.controller";

const userRouter = Router();

userRouter.get("/id/exist", isIdExistController);
userRouter.post("/register", registerAccountController);
userRouter.post("/join", loginController);

export default userRouter;
