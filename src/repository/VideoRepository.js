import User from "../domain/User";

class VideoRepository {
    constructor() {
        if (this.constructor === VideoRepository) {
            throw new Error("An instance was created as an abstract class.");
        }
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

    uploadVideo(video) {
        throw new Error("Methods of abstract classes must be overridden.");
    }

    fetchVideo(limit, offset) {
        throw new Error("Methods of abstract classes must be overridden.");
    }
}

export default VideoRepository;
