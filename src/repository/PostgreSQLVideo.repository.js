import UserRepository from "./UserRepository";
import { LogPrinter } from "../util/LogPrinter";
import { Pool } from "pg";
import User from "../domain/User";
import Video from "../domain/Video";
import dotenv from "dotenv";
import VideoRepository from "./VideoRepository";
dotenv.config();

class PostgreSQLVideoRepository extends VideoRepository {
    constructor() {
        super();
        this.pool = new Pool({
            user: process.env.POSTGRESQL_USER,
            host: process.env.POSTGRESQL_HOST,
            database: process.env.POSTGRESQL_DATABASE,
            password: process.env.POSTGRESQL_PASSWORD,
            port: process.env.POSTGRESQL_PORT,
        });
    }

    findByVideoId(videoId) {
        throw new Error("Methods of abstract classes must be overridden.");
    }

    findByTitle(title) {
        throw new Error("Methods of abstract classes must be overridden.");
    }

    findByDesc(desc) {
        throw new Error("Methods of abstract classes must be overridden.");
    }

    async uploadVideo(video) {
        const insertQuery = `INSERT INTO public.video (publisher, publish_date, status) VALUES ($1, $2, $3) RETURNING video_id;`;
        const values = [video.publisher, video.publishDate, video.status];
        try {
            const result = await this.pool.query(insertQuery, values);
            LogPrinter.info(
                `New video info is successfully upload to postgreSQL ${result}`
            );
            return {
                result: 0,
                video_id: result.rows[0].video_id,
            };
        } catch (err) {
            LogPrinter.error(err);
            return {
                result: 1,
                message: err,
            };
        }
    }

    fetchVideo(limit, offset) {
        throw new Error("Methods of abstract classes must be overridden.");
    }
}

export default new PostgreSQLVideoRepository();
