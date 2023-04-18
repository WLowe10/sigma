import { createContext } from "react";

export type PlaylistsContextType = {
    
};

export const PlaylistsContext = createContext<PlaylistsContextType | null>(null);