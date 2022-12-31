import axios from "axios";
import ytdl from "ytdl-core";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import * as downloadFunctions from "./functions";

import { songManager } from "../../services/song-manager";

export const downloadSong = async (url: string) => {
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

    await songManager.storeSongRecord({
        title: songInfo.title,
        artist: songInfo.artist,
        date: songInfo.date,
        url: url
    })
};

