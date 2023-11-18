import Video from "../domain/Video";
import PostgreSQLVideoRepository from "../repository/PostgreSQLVideo.repository";
import { requestVideoEncode } from "../service/videoEncode.service";
import { registerVideoToDB } from "../service/videoUpload.service";
import { LogPrinter } from "../util/LogPrinter";

export const registerVideo = async (req, res) => {
    await requestVideoEncode(req.app.encodingServer, req.video_id);
    res.send("File uploaded");
};

export const getPlatlist = (req, res) => {
    const videoId = req.params.videoId;
    const m3u8FilePath = path.join(videoId, "encoded", `${videoId}.m3u8`);
    res.redirect("http://localhost:5678/" + m3u8FilePath);
};

export const updateVideoInfo = async (req, res) => {
    const title = req.body.title;
    const desc = req.body.desc;
    const vid = req.params.videoId;

    const queryResult = await PostgreSQLVideoRepository.editVideoInfo(
        vid,
        title,
        desc
    );

    if (queryResult.result == 0) {
        res.json({
            result: 0,
            message: "성공적으로 반영되었습니다.",
        });
    } else {
        res.json({
            result: 1,
            message: queryResult.message,
        });
    }
};
