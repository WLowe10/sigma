import { create } from "zustand";
import { produce } from "immer";
import type { PlaylistType } from "@global/types";

export type PlaylistsStoreType = {
    playlists: Array<PlaylistType>,
    createPlayList: () => void,
    addSongs: (playlistId: string, songIds: Array<string>) => void,
};

export const usePlaylistsStore = create<PlaylistsStoreType>(set => ({
    playlists: [
        {
            id: "main",
            name: "Playlist 1",
            songs: [],
            shuffle: () => {},
        }
    ],

    createPlayList: () => set(produce(draft => {

    })),

    addSongs: (playlistId: string, songIds: Array<string>) => set(produce<PlaylistsStoreType>(draft => {
        const playlist = draft.playlists.find(pl => pl.id == playlistId);
        if (!playlist) return;

        playlist.songs = [...playlist.songs, ...songIds];
    }))
}))