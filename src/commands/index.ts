import { ipcRenderer } from "electron";

export const downloadSong = async () => {
    let response = await ipcRenderer.invoke("DOWNLOAD:SONG")
    console.log(response)
};

export const removeSong = async () => {
    let response = await ipcRenderer.invoke("REMOVE:SONG")
    console.log(response)
}