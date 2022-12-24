import React from "react";
import type { SongType } from "@global/types";

export type MusicPlayerContextType = {
   controls: {
        play: () => void,
        pause: () => void,
        setSong: (id: string) => void,
   },
   state: {
        playing: boolean,
        activeSong: SongType | null
   }
};

export const MusicPlayerContext = React.createContext<MusicPlayerContextType | null>(null)