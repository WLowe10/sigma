import { SongType } from "@renderer/types";
import React from "react";

export type SongsContextType = {
    songs: SongType[] | null,
    controls: {
        openDownloader: () => void,
        closeDownloader: () => void,
        downloadSong: (url: string) => Promise<SongType>;
    }
};

export const SongsContext = React.createContext<SongsContextType | null>(null);