import { create } from "zustand";
import { produce } from "immer";

export type PlaylistsStoreType = {
    playlists: Array<string>,
    createPlayList: any
};

export const usePlaylistsStore = create<PlaylistsStoreType>(set => ({
    playlists: [],

    createPlayList: () => set(produce(draft => {

    }))
}))