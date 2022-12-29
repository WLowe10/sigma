import { ipcMain } from "electron";
import { Commands } from "./commands";

import { downloadSong } from "./download-song";

export const createCommandHandler = () => {
    ipcMain.handle(Commands.DownloadSong, async (event, arg) => {
        return downloadSong("https://www.youtube.com/watch?v=kvO_nHnvPtQ");
    });
};

