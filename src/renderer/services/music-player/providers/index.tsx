import { useState, ReactNode, useRef, useEffect, useMemo, useCallback } from "react";
import { MusicPlayerContext } from "../context";
import { useSongsStore } from "@renderer/services/songs/store";
import { shuffle } from "@renderer/utils";
import { useYoutubePlayer } from "../hooks";
import { useSynchronize, useShuffle } from "@renderer/hooks";
import { useDiscordRPC } from "../hooks";
import { usePlaylistsStore } from "@renderer/services/playlists/store";
import type { SongType } from "@global/types";

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
    const [activeSong, setActiveSong] = useState<string | null>(null);
    const [activePlaylist, setActivePlaylist] = useState<string | null>(null);
    const [shuffling, setShuffling] = useState(false);
    const getSongs = useSongsStore(state => state.getSongs);
    const getAllSongs = useSongsStore(state => state.getAll);
    const getPlaylistSongs = usePlaylistsStore(state => state.getSongs);
    const { get: getShuffle, set: setShuffle } = useShuffle<SongType>((song) => song.id);
    useDiscordRPC(activeSong);

    const onEnd = useCallback((play: any) => {
        const nextSong = getNextSong();

        if (nextSong) {
            setActiveSong(nextSong.id);
            play(nextSong?.url);
        } else {
            play(null);
        };
    }, [activeSong, shuffling])

    const { state: playerState, controls: playerControls } = useYoutubePlayer({
        options: {
            // defaultVolume: 50,
        },
        events: {
            onEnd: onEnd 
        }
    });

    //implement playlist
    const handleSetSong = useCallback((songId: string) => {
        if (songId == activeSong) return;

        const song = getSongs([songId])[0];
        if (!song) return; 

        setActiveSong(songId);
        playerControls.load(song.url);
    }, [activeSong]);

    const handleNext = useCallback(() => {
        const nextSong = getNextSong();

        if (nextSong) {
            setActiveSong(nextSong.id);

            playerControls.load(nextSong.url);
            playerControls.play();
        };
    }, [activeSong]);

    const handleBack = useCallback(() => {
        const prevSong = getPreviousSong();

        if (prevSong) {
            setActiveSong(prevSong.id);

            playerControls.load(prevSong.url);
            playerControls.play();
        };
    }, [activeSong]);

    const handleToggleShuffle = useCallback(() => {
        setShuffling(prev => !prev);
    }, []);

    const getNextSong = () => {
        if (!activeSong) return;
        let nextSong = null;

        if (shuffling) {
            const nextSong = getShuffle();
            if (!nextSong) return;

            return nextSong;
        };

        if (activePlaylist) {
            const playlistSongs = getPlaylistSongs(activePlaylist);
            const currentIdx = playlistSongs.findIndex(song => song == activeSong);
            const nextSongId = playlistSongs[currentIdx + 1] || playlistSongs[0];
            nextSong = getSongs([nextSongId])[0];
        } else {
            const allSongs = getAllSongs();
            const currentIdx = allSongs.findIndex(song => song.id == activeSong);
            nextSong = allSongs[currentIdx + 1] || allSongs[0];
        }

        return nextSong;
    };

    const getPreviousSong = () => {
        if (!activeSong) return;
        let nextSong = null;

        if (activePlaylist) {
            const playlistSongs = getPlaylistSongs(activePlaylist);
            const currentIdx = playlistSongs.findIndex(song => song == activeSong);
            const nextSongId = playlistSongs[currentIdx -1] || playlistSongs[playlistSongs.length - 1];
            nextSong = getSongs([nextSongId])[0];
        } else {
            const allSongs = getAllSongs();
            const currentIdx = allSongs.findIndex(song => song.id == activeSong);
            nextSong = allSongs[currentIdx - 1] || allSongs[allSongs.length - 1];
        }

        return nextSong;
    };

    // const save = useSynchronize<any>("player", (initialPlayerSettings) => {
    //     if (initialPlayerSettings) playerControls.setVolume(initialPlayerSettings.volume)
    // });

    // useEffect(() => {
    //     save(playerState.volume);
    // }, [playerState.volume])


    return (
        <MusicPlayerContext.Provider value={{ 
            controls: {
                play: playerControls.play,
                pause: playerControls.pause,
                seek: playerControls.seek,
                loop: playerControls.toggleLoop,
                setVolume: playerControls.setVolume,
                mute: playerControls.toggleMute,
                setSong: handleSetSong,
                next: handleNext, 
                back: handleBack,
                shuffle: handleToggleShuffle,
            },
            state: {
                activeSong: activeSong,
                playing: playerState.playing,
                looping: playerState.looping,
                muted: playerState.muted,
                duration: playerState.duration,
                time: playerState.time,
                progress: playerState.progress,
                buffering: playerState.buffering,
                volume: playerState.volume,
                shuffling: shuffling,
            }
        }}>
            { 
                children 
            }
        </MusicPlayerContext.Provider>
    )
}