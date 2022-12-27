import { Storage } from "../base";
import { z } from "zod";
import path from "path";
import fs from "fs";

const songsSchema = z.object({
    songs: z.array(z.object({
         id: z.string(),
         title: z.string(),
         artist: z.string(),
         date: z.string(),
    }))
})

//!get songs may be executed before default file is written
type SongsType = z.infer<typeof songsSchema>;
 
export class SongsStorage extends Storage {
    constructor() {
        super("./songs/songs.json", songsSchema);
    };

    async getSongs() {
        let data: any = await super.readFile();
        console.log(data);
        return data.songs;
    };

    async writeThumbnail() {

    };

    defaultSettings() {
        return songsSchema.parse({songs: []});
    }
}