import { LogPrinter } from "../util/LogPrinter";
import { Pool } from "pg";
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

    async findByVideoId(videoId) {
        const selectQuery = `SELECT * FROM public.video WHERE video_id = $1`;
        const values = [videoId];

        try {
            const result = await this.pool.query(selectQuery, values);
            if (result) {
                LogPrinter.info(`Finding video by video_id is success`);
                const videoRow = result.rows[0];
                const videoInfo = new Video(
                    videoRow.video_id,
                    videoRow.title,
                    videoRow.desc,
                    videoRow.publisher,
                    videoRow.publish_date,
                    videoRow.hits,
                    videoRow.status
                );
                return { result: 0, video: videoInfo };
            } else {
                LogPrinter.info(`Finding video by video_id is fail`);
                return { result: 1, message: "fail to find video" };
            }
        } catch (err) {
            LogPrinter.error(err);
            return {
                result: 2,
                message: err,
            };
        }
    }

    async searchVideo(context) {
        const selectQuery = `SELECT * FROM public.video WHERE title LIKE `;
    }

    async findByTitle(title) {
        const selectQuery = `SELECT * FROM public.video WHERE title = $1`;
        const values = [title];

        try {
            const result = await this.pool.query(selectQuery, values);
            if (result) {
                LogPrinter.info(`Finding video by title is success`);
                const videoRow = result.rows[0];
                const videoInfo = new Video(
                    videoRow.video_id,
                    videoRow.title,
                    videoRow.desc,
                    videoRow.publisher,
                    videoRow.publishDate,
                    videoRow.hits,
                    videoRow.status
                );
                return { result: 0, video: videoInfo };
            } else {
                LogPrinter.info(`Finding video by title is fail`);
                return { result: 1, message: "fail to find video" };
            }
        } catch (err) {
            LogPrinter.error(err);
            return {
                result: 2,
                message: err,
            };
        }
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
                "New video info is successfully upload to postgreSQL"
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

    async editVideoInfo(videoId, title, desc) {
        const updateQuery = `UPDATE public.video SET "title" = $1, "desc" = $2 WHERE video_id = $3;`;
        const values = [title, desc, videoId];
        try {
            await this.pool.query(updateQuery, values);
            LogPrinter.info(
                "Editing video info is successfully updated to postgreSQL"
            );
            return {
                result: 0,
                message:
                    "Editing video info is successfully updated to postgreSQL",
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
