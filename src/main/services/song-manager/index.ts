import fs from "fs";
import ytdl from "ytdl-core";
import { v4 as uuidv4 } from "uuid";
import * as downloadFunctions from "./functions";

type SongType = {
    id: string,
    title: string,
    artist: string,
    date: string,
    url: string
};

type SongsStorage = {
    songs: [
        SongType
    ]
};

class SongManager {
    private readonly recordPath = "./songs/songs.json";

    constructor() {
        //?initialize storage location if non-existent
    };

    public async getSongs() {
        const data = await this.readJSON();

        return data.songs;
    };

    public async downloadSong(url: string) {
        if (!ytdl.validateURL(url)) return null;

        const songExists = await songManager.checkObstruction(url)
        if (songExists) return null;
    
        const songInfo = await downloadFunctions.getInfo(url);
        const thumbnailUrl = songInfo.thumbnail.url;
        const id = uuidv4();
    
        let [audio, thumbnail] = await Promise.all([
            downloadFunctions.downloadSong(url),
            downloadFunctions.downloadThumbnail(thumbnailUrl)
        ]);
    
        await Promise.allSettled([
            audio.pipe(fs.createWriteStream(`./songs/audio/${id}.mp3`)),
            thumbnail.pipe(fs.createWriteStream(`./songs/thumbnails/${id}.png`))
        ])

        const song = {
            id: id,
            title: songInfo.title,
            artist: songInfo.artist,
            date: songInfo.date,
            url: url
        };
    
        // await this.storeSongRecord(song);
        return song;
    };

    public async removeSong(id: string) {
        await this.removeSongRecord(id);

        return Promise.allSettled([
            fs.unlinkSync(`./songs/audio/${id}.mp3`),
            fs.unlinkSync(`./songs/thumbnails/${id}.png`)
        ])
    };

    private async checkObstruction(url: string) {
        const songReconds = await this.readJSON();
        const songExists = songReconds.songs.find(song => song.url == url);

        return songExists ? true : false;
    };

    private async storeSongRecord(newSong: SongType) {
        let newData = await this.readJSON()

        newData.songs.push(newSong);
        this.writeJSON(newData);
    };

    private async removeSongRecord(id: string) {
        let newData = await this.readJSON();
        let songIdx = newData.songs.findIndex(song => song.id);

        if (songIdx >= 0) {
            newData.songs.splice(songIdx, 1);
            this.writeJSON(newData);
        };
    };

    private async readJSON() {
        const data = await fs.readFileSync("./songs/songs.json", "utf8");
        const jsonData = JSON.parse(data) as SongsStorage;

        return jsonData;
    };

    private async writeJSON(data: any) {
        return await fs.writeFileSync(this.recordPath, JSON.stringify(data))
    };
}

export const songManager = new SongManager();
