import { SongType } from "@global/types";
import React from "react";

export type SongsContextType = {
    songs: SongType[] | null
};

export const SongsContext = React.createContext<SongsContextType | null>(null);