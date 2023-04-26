import { ipcMain } from "electron";
import { IpcKeys } from "../../global/constants";
import { v4 as uuidv4 } from "uuid";
import ytdl from "ytdl-core";
import type ElectronStore from "electron-store";
import type { BrowserWindow } from "electron";

type Props = {
    window: BrowserWindow,
    store: ElectronStore
};

export const createSongsCommands = ({ window, store }: Props) => {
    ipcMain.handle(IpcKeys.GET_SONGS, () => {
        return store.get("songs");
    });

    ipcMain.handle(IpcKeys.SONG_INFO, async (event: any, data: any) => {
        const info = await ytdl.getBasicInfo(data.url);
        const id = uuidv4();

        return {
            id: id,
            url: data.url,
            title: info.videoDetails.title,
            artist: info.videoDetails.ownerChannelName,
            date: info.videoDetails.publishDate,
            duration: info.videoDetails.lengthSeconds,
            thumbnail: info.videoDetails.thumbnails[0].url
        };
    });
};