import { SongType } from "@global/types";
import React from "react";

export type SongsContextType = {
    songs: SongType[] | null,
    controls: {
        downloadSong: (url: string) => Promise<SongType>;
    }
};

export const SongsContext = React.createContext<SongsContextType | null>(null);