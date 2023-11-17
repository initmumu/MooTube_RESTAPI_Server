class Video {
    constructor(videoId, title, desc, publisher, publishDate, hits, status) {
        this.videoId = videoId;
        this.title = title;
        this.desc = desc;
        this.publisher = publisher;
        this.publishDate = publishDate;
        this.hits = hits;
        this.status = status;
    }

    setVideoId(videoId) {
        this.videoId = videoId;
    }

    setTitle(title) {
        this.title = title;
    }

    setDesc(desc) {
        this.desc = desc;
    }

    setPublisher(publisher) {
        this.publisher = publisher;
    }

    setPublishDate(publishDate) {
        this.publishDate = publishDate;
    }
    setHits(hits) {
        this.hits = hits;
    }
    setStatus(status) {
        this.status = status;
    }
}

export default Video;
