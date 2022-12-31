import { songManager } from "../../services/song-manager"; 

export const downloadSong = async (url: string) => {
    return await songManager.downloadSong(url);
};

export const removeSong = async (id: string) => {
    return await songManager.removeSong(id);
};