import { songManager } from "../../services/song-manager";

export const downloadSong = async (url: string) => {
    return songManager.downloadSong(url);
};