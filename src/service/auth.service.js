import jwt from "jsonwebtoken";
import PostgreSQLVideoRepository from "../repository/PostgreSQLVideo.repository";

export function basicJWTAuth(req, res, next) {
    try {
        req.decoded = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );

        return next();
    } catch (err) {
        res.status(403).json({
            result: 1,
            message: "Login is failed",
        });
    }
}

export async function uploaderJWTAuth(req, res, next) {
    try {
        req.decoded = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        const vid = req.params.videoId;
        const queryResult = await PostgreSQLVideoRepository.findByVideoId(vid);
        if (req.decoded.uid != queryResult.video.publisher) {
            return res.json({
                result: 2,
                message: "You do not have permission to access video info",
            });
        }
        return next();
    } catch (err) {
        res.status(403).json({
            result: 1,
            message: "Login is failed",
        });
    }
}
