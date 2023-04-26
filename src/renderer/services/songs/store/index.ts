import { SongType } from "@global/types";
import { create } from "zustand";
import { produce } from "immer";

type SongsStoreType = {
    songs: Array<SongType>,
    getAll: () => Array<SongType>,
    getSongs: (idArr: Array<string>) => Array<SongType>
    addSongs: (newSong: Array<SongType>) => void;
    bumpSong: (id: string) => void,
    deleteSongs: (idArr: Array<string>) => void;
    loadSongs: (songs: Array<SongType>) => void;
};

export const useSongsStore = create<SongsStoreType>((set, get) => ({
    songs: [],

    getAll: () => {
        return get().songs;
    },
    getSongs: (idArr: Array<string>) => {
        return get().songs.filter(song => idArr.includes(song.id));
    },
    addSongs: (newSongs: Array<SongType>) => set(produce<SongsStoreType>(draft => {
        // const nonDuplicates = newSongs.filter(newSong => !draft.songs.find(song => song.id == newSong.id));
        draft.songs = [...draft.songs, ...newSongs];
    })),
    deleteSongs: (idArr: Array<string>) => set(produce(draft => {
        const filteredSongs = draft.songs.filter((song: SongType) => !idArr.includes(song.id))
        draft.songs = filteredSongs;
    })),
    bumpSong: (id: string) => set(produce<SongsStoreType>(draft => {
        const songIdx = draft.songs.findIndex(song => song.id == id);
        if (!songIdx) return;

        const song = draft.songs[songIdx];
        draft.songs.splice(songIdx, 1);

        draft.songs.unshift(song);
    })),
    loadSongs: (songs: Array<SongType>) => set(() => ({
        songs: songs
    })),
}))