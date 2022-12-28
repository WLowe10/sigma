import { ipcMain } from "electron";
import { Commands } from "./commands";

export const createCommandHandler = () => {
    ipcMain.handle(Commands.DownloadSong, (event, arg) => {
        console.log("test")
    });
};

