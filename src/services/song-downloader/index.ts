import ytdl from 'ytdl-core';
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

export class SongDownloader {
    protected url: string; 
    protected id: string;
    
    constructor(url: string) {
        this.url = url;
        this.id = uuidv4()
    };

    async run() {
        const info = await this.getInfo();

        await this.download();
    }

    async download() {
        await ytdl("https://www.youtube.com/watch?v=oGIKgRGDA-k", { filter: "audioonly" }).pipe(fs.createWriteStream(`${this.id}.mp3`))
    };

    async getInfo() {
        const info = await ytdl.getBasicInfo(this.url);

        return {
            name: info.videoDetails.title,
            artist: info.videoDetails.ownerChannelName,
            date: info.videoDetails.publishDate, 
            thumbnail: info.videoDetails.thumbnails[0]
        }
    }

    async storeSong() {
        
    }
}