import { create } from "zustand";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";
import type { PlaylistType, SongType } from "@global/types";

export type PlaylistsStoreType = {
    playlists: Array<PlaylistType>,
    createPlayList: (name: string) => void,
    getSongs: (playlistId: string) => Array<string>,
    addSongs: (playlistId: string, songIds: Array<string>) => void,
    removeSongs: (playlistId: string, songIds: Array<string>) => void,
    deletePlaylist: (id: string) => void,
    getPlaylists: () => Array<PlaylistType>,
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
    removeSongs: (playlistId: string, songIds: Array<string>) => set(produce<PlaylistsStoreType>(draft => {
        const playlist = draft.playlists.find(pl => pl.id == playlistId);
        if (!playlist) return;

        const filteredSongs = playlist.songs.filter(song => !songIds.includes(song))
        playlist.songs = filteredSongs;
    })),
    deletePlaylist: (id: string) => set(produce<PlaylistsStoreType>(draft => {
        const filteredPlaylists = draft.playlists.filter((playlist) => playlist.id !== id);
        draft.playlists = filteredPlaylists;
    })),
    getPlaylists: () => {
        return get().playlists;
    },
    loadPlaylists: (playlists: Array<PlaylistType>) => set(() => ({
        playlists: playlists
    })),
}))