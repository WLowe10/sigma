import { useEffect, useState, ReactNode } from "react";
import { SongsContext } from "../context";

import { getSongs } from "@global/commands";
import { SongType } from "@global/types";

export const SongsProvider = ({ children }: { children: ReactNode }) => {
    const [songs, setSongs] = useState(null);

    useEffect(() => {

    }, [])

    return (
        <SongsContext.Provider value={{songs}}>
            {
                children
            }
        </SongsContext.Provider>
    )
};