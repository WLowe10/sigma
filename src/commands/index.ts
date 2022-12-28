import { ipcRenderer } from "electron";

export const testCommand = () => {
    ipcRenderer.invoke("DownloadSong")
};