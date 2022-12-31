import { ipcMain } from "electron";
import { Commands } from "./commands";

import * as songCommands from "./songs";

export const createCommandHandler = () => {
    ipcMain.handle(Commands.GetSongs, async (event, arg) => {
        return songCommands.getSongs();
    });

    ipcMain.handle(Commands.DownloadSong, async (event, arg) => {
        return songCommands.downloadSong(arg);
    });

    ipcMain.handle(Commands.RemoveSong, async (event, arg) => {
        return songCommands.removeSong(arg);
    });
};

