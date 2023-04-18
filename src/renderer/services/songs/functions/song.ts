import fs from "fs";
import ytdl from "ytdl-core";

export const downloadSong = async (url: string) => {
    return await ytdl(url, { filter: "audioonly" })
};

