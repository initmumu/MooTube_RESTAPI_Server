import Video from "../domain/Video";
import PostgreSQLVideoRepository from "../repository/PostgreSQLVideo.repository";
import { registerVideoToDB } from "../service/videoUpload.service";

export async function registerVideo(req, res) {
    res.send("File uploaded");
}
