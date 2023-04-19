import { createContext } from "react";

export type PlaylistsContextType = {
    controls: {
        create: () => void,
        delete: () => void,
        addSongs: (playlistId: string, songIds: Array<string>) => void,
        removeSongs: (playlistId: string, songIds: Array<string>) => void, 
    }
};

export const PlaylistsContext = createContext<PlaylistsContextType | null>(null);