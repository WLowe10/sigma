import { ipcMain } from "electron";
import { IpcKeys } from "../../global/constants";
import { songManager } from "../services/song-manager";
import ytdl from "ytdl-core";
import type ElectronStore from "electron-store";
import type { SongType } from "@global/types";
import type { BrowserWindow } from "electron";

type Props = {
    window: BrowserWindow,
    store: ElectronStore
};

export const createSongsCommands = ({ window, store }: Props) => {
    ipcMain.handle(IpcKeys.GET_SONGS, () => {
        return store.get("songs");
    });

    ipcMain.handle(IpcKeys.SONG_ADD, async (event: any, data: any) => {
        const songData = await songManager.downloadSong(data.url);
        const prevSongs = store.get("songs");
        const newSongs = Array.isArray(prevSongs) ? [...prevSongs, songData] : [songData];
        store.set("songs", newSongs);

        return songData;
    });

    ipcMain.handle(IpcKeys.SONG_DELETE, (event: any, idArr: Array<string>) => {
        const songs = store.get("songs") as Array<SongType>;
        const filteredSongs = songs.filter(song => !idArr.includes(song.id));

        store.set("songs", filteredSongs);
    });

    ipcMain.on(IpcKeys.PLAY_SONG, (event: any, url) => {
        const stream = ytdl(url, { filter: "audioonly" });

        stream.on("data", (chunk) => {
            event.reply(IpcKeys.SONG_STREAM, {
                type: "chunk",
                chunk: chunk
            })
        });

        stream.on("end", () => {
            window.webContents.send(IpcKeys.SONG_STREAM, {
                type: "end"
            })
        });
    });
};