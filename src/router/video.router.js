import { Router } from "express";
import {
    getPlatlist,
    registerVideo,
    updateVideoInfo,
} from "../controller/video.controller";
import { basicJWTAuth, uploaderJWTAuth } from "../service/auth.service";
import { upload } from "../service/videoUpload.service";

const videoRouter = Router();

videoRouter.get("/:videoId", getPlatlist);
videoRouter.post("/upload", basicJWTAuth, upload.single("file"), registerVideo);
videoRouter.put("/:videoId/info", uploaderJWTAuth, updateVideoInfo);

export default videoRouter;
