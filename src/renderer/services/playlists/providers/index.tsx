import { PlaylistsContext } from "../context";
import type { ReactNode } from "react";
import { usePlaylistsStore } from "../store";

export const PlaylistsProvider = ({ children }: { children: ReactNode }) => {
    const addSongs = usePlaylistsStore(state => state.addSongs);

    const handleCreatePlayList = () => {

    };

    const handleDeletePlaylist = () => {

    };

    const handleAddSongs = (playlistId: string, songIds: Array<string>) => {
        addSongs(playlistId, songIds);
    };

    const handleRemoveSongs = (playlistId: string, songIds: Array<string>) => {

    };

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