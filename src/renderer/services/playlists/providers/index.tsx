import { useEffect } from "react";
import { useSynchronize } from "@renderer/hooks";
import { PlaylistsContext } from "../context";
import { usePlaylistsStore } from "../store";
import type { ReactNode } from "react";
import { PlaylistType } from "@global/types";

export const PlaylistsProvider = ({ children }: { children: ReactNode }) => {
    const addSongs = usePlaylistsStore(state => state.addSongs);
    const addPlaylists = usePlaylistsStore(state => state.createPlayList);
    const loadPlaylists = usePlaylistsStore(state => state.loadPlaylists);
    const createPlaylist = usePlaylistsStore(state => state.createPlayList);

    const handleCreatePlayList = (name: string) => {
        createPlaylist(name);
    };

    const handleDeletePlaylist = () => {

    };

    const handleAddSongs = (playlistId: string, songIds: Array<string>) => {
        addSongs(playlistId, songIds);
    };

    const handleRemoveSongs = (playlistId: string, songIds: Array<string>) => {

    };

    useSynchronize<Array<PlaylistType>>("playlists", 
        (save) => {
            usePlaylistsStore.subscribe((state) => {
                save(state.playlists);
            })
        },
        (initial) => {
            loadPlaylists(initial);
        }
    );

    return (
        <PlaylistsContext.Provider value={{
            controls: {
                create: handleCreatePlayList,
                delete: handleDeletePlaylist,
                addSongs: handleAddSongs,
                removeSongs: handleRemoveSongs
            }
        }}>
            {
                children
            }
        </PlaylistsContext.Provider>
    )
};