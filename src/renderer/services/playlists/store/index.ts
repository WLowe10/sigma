import { create } from "zustand";
import { produce } from "immer";
import { shuffle } from "@renderer/utils";
import { v4 as uuidv4 } from "uuid";
import type { PlaylistType, SongType } from "@global/types";

export type PlaylistsStoreType = {
    playlists: Array<PlaylistType>,
    createPlayList: (name: string) => void,
    getSongs: (playlistId: string) => Array<string>,
    addSongs: (playlistId: string, songIds: Array<string>) => void,
    loadPlaylists: (playlists: Array<PlaylistType>) => void,
};

export const usePlaylistsStore = create<PlaylistsStoreType>((set, get) => ({
    playlists: [],

    createPlayList: (name: string) => set(produce<PlaylistsStoreType>(draft => {
        const newPlaylist = {
            id: uuidv4(),
            name: name, 
            songs: [],
            remainingSongs: [],
        };

        draft.playlists.push(newPlaylist);
    })),
    getSongs: (playlistId: string) => {
        const playlists = get().playlists;
        const playlist = playlists.find(p => p.id == playlistId);

        return playlist ? playlist.songs : [];
    },
    addSongs: (playlistId: string, songIds: Array<string>) => set(produce<PlaylistsStoreType>(draft => {
        const playlist = draft.playlists.find(pl => pl.id == playlistId);
        if (!playlist) return;

        playlist.songs = [...playlist.songs, ...songIds];
    })),
    loadPlaylists: (playlists: Array<PlaylistType>) => set(() => ({
        playlists: playlists
    }))
}))