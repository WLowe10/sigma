import { useEffect, useState, ReactNode } from "react";
import { SongsContext } from "../context";
import { SongType } from "@global/types";
import { SongDownloadModal } from "../modals";
import { useSongsStore } from "../store";
import { IpcKeys } from "@global/constants";
import { Howl } from "howler";
import { all } from "axios";

export const SongsProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const addSongs = useSongsStore(state => state.addSongs);
    const deleteSongs = useSongsStore(state => state.deleteSongs);

    const handleGetSongs = async () => {
        const songs = await window.electron.songsService.getSongs();
        if (songs) addSongs(songs);
    };

    const handleAddSong = async (url: string) => {
        setDownloading(true);

        const newSong = await window.electron.songsService.addSong(url);
        addSongs([newSong]);

        setDownloading(false);
    };

    const handleDeleteSongs = (idArr: Array<string>) => {
        window.electron.songsService.deleteSong(idArr);
        deleteSongs(idArr);
    };

    const handlePlaySong = () => {
        
    };

    const handleDownloadOpen = () => {
        setOpen(true);
    };

    const handleDownloadClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        handleGetSongs();
    }, []);

    return (
        <SongsContext.Provider value={{
            state: {
                downloading: downloading
            },
            controls: {
                openDownloader: handleDownloadOpen,
                closeDownloader: handleDownloadClose,
                addSong: handleAddSong,
                deleteSongs: handleDeleteSongs
            }
        }}>
            <SongDownloadModal open={open}/>
            {
                children
            }
        </SongsContext.Provider>
    )
};