import { SongType } from "@global/types";
import React from "react";

export type SongsContextType = {
    state: {
        downloading: boolean
    },
    controls: {
        openDownloader: () => void,
        closeDownloader: () => void,
        addSong: (url: string) => void;
        deleteSongs: (idArr: Array<string>) => void;
    }
};

export const SongsContext = React.createContext<SongsContextType | null>(null);