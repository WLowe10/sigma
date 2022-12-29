import ytdl from 'ytdl-core';
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import { SongsStorage } from '@services/storage';
import { SongType } from '@global/types';
import axios from 'axios';

export class SongDownloader {
    protected id?: string;
    protected storage: SongsStorage;

    constructor() {
        this.storage = new SongsStorage();
    };

    public validate(url: string) {
        return ytdl.validateURL(url);
    };

    public async download(url: string) {
        console.log("downloading song")
        this.id = uuidv4()

        let results = await Promise.all([
            this.getInfo(url),
            this.ytdlDownload(url)
        ]);

        let songInfo = results[0];
        await this.storeSong(songInfo)
    };

    protected async ytdlDownload(url: string) {
        return await ytdl(url, { filter: "audioonly" }).pipe(fs.createWriteStream(`./songs/audio/${this.id}.mp3`));
    };

    protected async downloadThumbnail(url: string) {
        if (!this.id) return;
        let response = await axios.get(url, {
           responseType: "stream"
        });

        await response.data.pipe(fs.createWriteStream(`./songs/thumbnails/${this.id}.png`));
    };

    protected async getInfo(url: string) {
        const info = await ytdl.getBasicInfo(url);

        return {
            title: info.videoDetails.title,
            artist: info.videoDetails.ownerChannelName,
            date: info.videoDetails.publishDate, 
            thumbnail: info.videoDetails.thumbnails[0]
        };
    };

    protected async storeSong(songInfo: { 
        title: string,
        artist: string, 
        date: string,
        thumbnail: ytdl.thumbnail
     }) {
        if (!this.id) return;

        await this.storage.storeSong({
            id: this.id,
            title: songInfo.title,
            artist: songInfo.artist,
            date: songInfo.date
        })

        await this.downloadThumbnail(songInfo.thumbnail.url)
    };
}