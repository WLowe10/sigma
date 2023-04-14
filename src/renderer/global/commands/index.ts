import { ipcRenderer } from "electron";

export const getSongs = async () => {
    return await ipcRenderer.invoke("ALL:SONG");
};

export const downloadSong = async (url: string) => {
    let response = await ipcRenderer.invoke("DOWNLOAD:SONG", url);
    //!needs error handling
    return response;
};

export const removeSong = async () => {
    let response = await ipcRenderer.invoke("REMOVE:SONG");
    console.log(response);
};

export enum WinAlterations {
    Minimize = "MINIMIZE:WIN",
    Maximize = "MAXIMIZE:WIN",
    Close = "CLOSE:WIN"
}

//setup this enum in main

export const alterWin = (alteration: WinAlterations) => {
    ipcRenderer.invoke("ALTER:WIN", alteration)
};



//!separate commands into respective directories