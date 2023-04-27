import { useEffect } from "react";
import { useSynchronize } from "@renderer/hooks";
import { PlaylistsContext } from "../context";
import { usePlaylistsStore } from "../store";
import { PlaylistType } from "@global/types";
import type { ReactNode } from "react";

export const PlaylistsProvider = ({ children }: { children: ReactNode }) => {
    const addSongs = usePlaylistsStore(state => state.addSongs);
    const removeSongs = usePlaylistsStore(state => state.removeSongs);
    const addPlaylists = usePlaylistsStore(state => state.createPlayList);
    const loadPlaylists = usePlaylistsStore(state => state.loadPlaylists);
    const createPlaylist = usePlaylistsStore(state => state.createPlayList);
    const deletePlaylist = usePlaylistsStore(state => state.deletePlaylist);

    const handleCreatePlayList = (name: string) => {
        createPlaylist(name);
    };

    const handleDeletePlaylist = (playlistId: string) => {
        deletePlaylist(playlistId);
    };

    const handleAddSongs = (playlistId: string, songIds: Array<string>) => {
        addSongs(playlistId, songIds);
    };

    const handleRemoveSongs = (playlistId: string, songIds: Array<string>) => {
        removeSongs(playlistId, songIds);
    };

    const save = useSynchronize<Array<PlaylistType>>("playlists", (initialPlaylists) => {
        if (initialPlaylists) loadPlaylists(initialPlaylists);
    });

    useEffect(() => {
        const clear = usePlaylistsStore.subscribe((state) => {
            save(state.playlists);
        });

        return clear;
    }, [])

    return (
        <PlaylistsContext.Provider value={{
            controls: {
                create: handleCreatePlayList,
                delete: handleDeletePlaylist,
                addSongs: handleAddSongs,
                removeSongs: handleRemoveSongs,
            }
        }}>
            {
                children
            }
        </PlaylistsContext.Provider>
    )
};