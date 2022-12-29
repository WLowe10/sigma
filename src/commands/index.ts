import { ipcRenderer } from "electron";

export const downloadSong = async () => {
    let response = await ipcRenderer.invoke("DOWNLOAD:SONG")
    console.log(response)
};