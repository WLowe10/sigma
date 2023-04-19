import React from "react";

export type SongsContextType = {
    state: {
        downloading: boolean
    },
    controls: {
        addSong: (url: string) => void;
        deleteSongs: (idArr: Array<string>) => void;
    }
};

export const SongsContext = React.createContext<SongsContextType | null>(null);