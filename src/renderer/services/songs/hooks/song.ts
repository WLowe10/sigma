import { useSongsStore } from "../store";

export const useSong = (songId: string | null | undefined) => {
    return useSongsStore(state => songId && state.songs.find(song => song.id == songId));
};