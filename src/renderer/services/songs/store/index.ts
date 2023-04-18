import { SongType } from "@global/types";
import { create } from "zustand";
import { produce } from "immer";

type SongsStoreType = {
    songs: Array<SongType>,
    addSongs: (newSong: Array<SongType>) => void;
    deleteSongs: (idArr: Array<string>) => void;
};

export const useSongsStore = create<SongsStoreType>(set => ({
    songs: [],

    addSongs: (newSongs: Array<SongType>) => set(produce(draft => {
        draft.songs = [...draft.songs, ...newSongs];
    })),
    deleteSongs: (idArr: Array<string>) => set(produce(draft => {
        const filteredSongs = draft.songs.filter((song: SongType) => !idArr.includes(song.id))
        draft.songs = filteredSongs;
    }))
}))