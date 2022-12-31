import { ipcRenderer } from "electron";

export const getSongs = async () => {
    let response = await ipcRenderer.invoke("ALL:SONG");
    console.log(response);
};

export const downloadSong = async (url: string) => {
    let response = await ipcRenderer.invoke("DOWNLOAD:SONG", url);
    console.log(response);
};

export const removeSong = async () => {
    let response = await ipcRenderer.invoke("REMOVE:SONG");
    console.log(response);
};