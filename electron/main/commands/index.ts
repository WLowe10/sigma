import { ipcMain } from "electron";
import { Commands } from "./commands";

import * as songCommands from "./songs";

export const createCommandHandler = () => {
    ipcMain.handle(Commands.DownloadSong, async (event, arg) => {
        return songCommands.downloadSong("https://www.youtube.com/watch?v=kvO_nHnvPtQ");
    });

    ipcMain.handle(Commands.RemoveSong, async (event, arg) => {
        return songCommands.removeSong("https://www.youtube.com/watch?v=kvO_nHnvPtQ");
    });
};

