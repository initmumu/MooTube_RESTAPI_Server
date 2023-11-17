import multer from "multer";
import Video from "../domain/Video";
import PostgreSQLVideoRepository from "../repository/PostgreSQLVideo.repository";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const userInfo = req.decoded;
        const queryResult = await registerVideoToDB(userInfo);
        req.video_id = queryResult.video_id.toString();
        const uploadPath = path.join(
            process.cwd(),
            "video",
            req.video_id,
            "original"
        );

        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, req.video_id + path.extname(file.originalname));
    },
});

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(mp4)$/))
            return cb(
                new Error("Only mp4 files are allowed to upload!"),
                false
            );
        cb(null, true);
    },
});

async function registerVideoToDB(userInfo) {
    const videoInfo = new Video();
    videoInfo.setPublisher(userInfo.uid);
    videoInfo.setPublishDate(new Date());
    videoInfo.setStatus("Before Encode");

    const result = await PostgreSQLVideoRepository.uploadVideo(videoInfo);
    return result;
}
