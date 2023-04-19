import { create } from "zustand";
import { produce } from "immer";
import { shuffle } from "@renderer/utils";
import { v4 as uuidv4 } from "uuid";
import type { PlaylistType } from "@global/types";

export type PlaylistsStoreType = {
    playlists: Array<PlaylistType>,
    createPlayList: (name: string) => void,
    addSongs: (playlistId: string, songIds: Array<string>) => void,
};

export const usePlaylistsStore = create<PlaylistsStoreType>(set => ({
    playlists: [],

    createPlayList: (name: string) => set(produce<PlaylistsStoreType>(draft => {
        const newPlaylist = {
            id: uuidv4(),
            name: name, 
            songs: [],
        }
        draft.playlists.push()
    })),

    addSongs: (playlistId: string, songIds: Array<string>) => set(produce<PlaylistsStoreType>(draft => {
        const playlist = draft.playlists.find(pl => pl.id == playlistId);
        if (!playlist) return;

        playlist.songs = [...playlist.songs, ...songIds];
    })),

    loadPlaylists: (playlists: Array<PlaylistType>) => set(() => ({
        playlists: playlists
    }))
}))