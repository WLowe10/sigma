import { createContext } from "react";

export type PlaylistsContextType = {
    controls: {
        create: (name: string) => void,
        delete: (id: string) => void,
        addSongs: (playlistId: string, songIds: Array<string>) => void,
        removeSongs: (playlistId: string, songIds: Array<string>) => void, 
    }
};

export const PlaylistsContext = createContext<PlaylistsContextType | null>(null);