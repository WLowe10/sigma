import { useEffect, useState, ReactNode } from "react";
import { SongsContext } from "../context";
import { SongType } from "@global/types";
import { useSongsStore } from "../store";
import { useSynchronize } from "@renderer/hooks";
import { usePlaylists } from "@renderer/services/playlists/hooks";
import { usePlaylistsStore } from "@renderer/services/playlists/store";

export const SongsProvider = ({ children }: { children: ReactNode }) => {
    const { controls: playlistControls } = usePlaylists();
    const [downloading, setDownloading] = useState(false);
    const addSongs = useSongsStore(state => state.addSongs);
    const deleteSongs = useSongsStore(state => state.deleteSongs);
    const loadSongs = useSongsStore(state => state.loadSongs);
    const getPlaylists = usePlaylistsStore(state => state.getPlaylists);

    const handleAddSong = async (url: string) => {
        setDownloading(true);

        const newSong = await window.electron.songsService.getSongInfo(url);
        addSongs([newSong]);

        setDownloading(false);
    };

    const handleDeleteSongs = (idArr: Array<string>) => {
        const playlists = getPlaylists();

        idArr.forEach((songId) => {
            const pl = playlists.find(playlist => playlist.songs.includes(songId));

            if (pl) {
               playlistControls.removeSongs(pl.id, [songId]); 
            };
        });

        deleteSongs(idArr);
    };

    const save = useSynchronize<Array<SongType>>("songs", (initialSongs) => {
        if (initialSongs) loadSongs(initialSongs);
    })

    useEffect(() => {
        const clear = useSongsStore.subscribe((state) => {
            save(state.songs);
        });

        return clear;
    }, [])

    return (
        <SongsContext.Provider value={{
            state: {
                downloading: downloading
            },
            controls: {
                addSong: handleAddSong,
                deleteSongs: handleDeleteSongs,
            }
        }}>
            {
                children
            }
        </SongsContext.Provider>
    )
};