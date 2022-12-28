import { Storage } from "../base";
import { z } from "zod";
import path from "path";
import fs from "fs";
import type { SongType } from "@global/types";
import { v4 as uuidv4 } from "uuid";

const songsSchema = z.object({
    songs: z.array(z.object({
         id: z.string(),
         title: z.string(),
         artist: z.string(),
         date: z.string(),
    }))
})


//!get songs may be executed before default file is written
 
export class SongsStorage extends Storage {
    protected readonly basePath = "./songs";

    constructor() {
        super("./songs/songs.json", songsSchema);
    };

    async getSongs() {
        let data: any = await super.readFile();
        return data.songs;
    };

    async storeSong(song: SongType) {
        let allSongData: any = await super.readFile();
        allSongData.songs.push(song);
        super.writeFile(allSongData)
    };

    defaultSettings() {
        return songsSchema.parse({songs: []});
    }
}