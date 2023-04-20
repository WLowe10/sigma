import { ipcMain } from "electron";
import { IpcKeys } from "../../global/constants";
import type ElectronStore from "electron-store";
import type { BrowserWindow } from "electron";

type Props = {
    window: BrowserWindow,
    store: ElectronStore
};

export const createMusicCommands = ({ window, store }: Props) => {
    ipcMain.on(IpcKeys.PLAY_SONG, (event: any, url) => {
        // window.webContents.findInPage("#yt-view")
    });
};