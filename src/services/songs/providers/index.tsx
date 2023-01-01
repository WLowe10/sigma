import { useEffect, useState, ReactNode } from "react";
import { SongsContext } from "../context";

import * as songCommands from "@global/commands";
import { SongType } from "@global/types";

export const SongsProvider = ({ children }: { children: ReactNode }) => {
    const [songs, setSongs] = useState<SongType[]>([]);

    const downloadSong = async (url: string) => {
        const newSong = await songCommands.downloadSong(url);

        let newSongs = [...songs, newSong];
        setSongs(newSongs);

        return newSong;
    };

    const getSongs = async () => {
        const allSongs = await songCommands.getSongs();
        setSongs(allSongs);
    };

    useEffect(() => {
        getSongs();
    }, []);

    const controls = {
        downloadSong
    }

    return (
        <SongsContext.Provider value={{songs, controls}}>
            {
                children
            }
        </SongsContext.Provider>
    )
};