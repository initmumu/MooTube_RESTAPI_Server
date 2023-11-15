import { Router } from "express";
import { registerVideo } from "../controller/video.controller";
import { jwtAuth } from "../service/auth.service";
import { upload } from "../service/videoUpload.service";

const videoRouter = Router();

videoRouter.get("/upload", jwtAuth, upload.single("file"), registerVideo);

export default videoRouter;
