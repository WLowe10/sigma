import { ipcMain } from "electron";
import { IpcKeys } from "../../global/constants";
import { songManager } from "../services/song-manager";
import type ElectronStore from "electron-store";

export const createSongsCommands = (store: ElectronStore) => {
    ipcMain.handle(IpcKeys.SONGS_DOWNLOAD, (event: any, data: any) => {
        return songManager.downloadSong(data.url);
    });
};