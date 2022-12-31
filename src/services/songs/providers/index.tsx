import { useEffect, useState, ReactNode } from "react";
import { SongsContext } from "../context";

import { getSongs as getSongsCommand } from "@global/commands";
import { SongType } from "@global/types";

export const SongsProvider = ({ children }: { children: ReactNode }) => {
    const [songs, setSongs] = useState<SongType[] | null>(null);

    const getSongs = async () => {
        const allSongs = await getSongsCommand();
        setSongs(allSongs);
    };

    useEffect(() => {
        getSongs();
    }, []);

    return (
        <SongsContext.Provider value={{songs}}>
            {
                children
            }
        </SongsContext.Provider>
    )
};