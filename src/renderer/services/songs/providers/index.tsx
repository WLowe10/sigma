import { useEffect, useState, ReactNode } from "react";
import { SongsContext } from "../context";
import { SongType } from "@renderer/types";
import { SongDownloadModal } from "../modals";

export const SongsProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [songs, setSongs] = useState<SongType[]>([]);

    const handleDownloadSong = async (url: string) => {
        // const newSong = await window.electron..downloadSong(url);

        // let newSongs = [...songs, newSong];
        // setSongs(newSongs);

        // return newSong;
        const songData = await window.electron.songsService.downloadSong("https://www.youtube.com/watch?v=aelpqWEBHR4")
        console.log(songData)
    };

    const handleGetSongs = async () => {
        // const allSongs = await songCommands.getSongs();
        // setSongs(allSongs);
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
            songs, 
            controls: {
                openDownloader: handleDownloadOpen,
                closeDownloader: handleDownloadClose,
                downloadSong: handleDownloadSong
            }
        }}>
            <SongDownloadModal open={open}/>
            {
                children
            }
        </SongsContext.Provider>
    )
};