import { PlaylistsContext } from "../context";
import type { ReactNode } from "react";

export const PlaylistsProvider = ({ children }: { children: ReactNode }) => {
    const handleCreatePlayList = () => {

    };

    const handleDeletePlaylist = () => {

    };

    return (
        <PlaylistsContext.Provider value={null}>
            {
                children
            }
        </PlaylistsContext.Provider>
    )
};