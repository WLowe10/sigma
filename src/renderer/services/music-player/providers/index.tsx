import { useState, ReactNode, useRef, useEffect, useMemo } from "react";
import { MusicPlayerContext } from "../context";
import { useSongsStore } from "@renderer/services/songs/store";
import { shuffle } from "@renderer/utils";
import { useYoutubePlayer } from "../hooks";

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
    const [activeSong, setActiveSong] = useState<string | null>(null);
    const [activePlaylist, setActivePlaylist] = useState<string | null>(null);
    const getSongs = useSongsStore(state => state.getSongs);
    const getAllSongs = useSongsStore(state => state.getAll);
    const { state: playerState, controls: playerControls } = useYoutubePlayer();
    // const ytRef = useRef<any | null>(null);

    const handleSetSong = (songId: string, play?: boolean) => {
        const song = getSongs([songId])[0];
        if (!song) return;

        playerControls.load(song.url);
        setActiveSong(songId);
    };

    const handlePlay = () => {
        if (!activeSong) return;

        // const songData = getSongs([activeSong])[0];
        playerControls.play();
    };

    const handlePause = () => {
        // await audio.current.fade(audio.current.volume(), 0, 500);
        playerControls.pause();
    };

    const handleToggleLoop = () => {
        playerControls.toggleLoop();
    };

    const handleSetVolume = (volume: number) => {
        playerControls.setVolume(volume);
    };

    const handleNext = () => {
        if (!activeSong) return;

        const allSongs = getAllSongs();
        const currentIdx = allSongs.findIndex(song => song.id == activeSong);
        const nextSong = allSongs[currentIdx + 1] || allSongs[0];

        setActiveSong(nextSong.id);
    };

    const handleBack = () => {
        if (!activeSong) return;

        const allSongs = getAllSongs();
        const currentIdx = allSongs.findIndex(song => song.id == activeSong);
        const nextSong = allSongs[currentIdx - 1] || allSongs[allSongs.length - 1];

        setActiveSong(nextSong.id);
    };

    const handleShuffle = () => {
        // const shuffled = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    };

    return (
        <MusicPlayerContext.Provider value={{ 
            controls: {
                setSong: handleSetSong,
                play: handlePlay,
                pause: handlePause,
                loop: handleToggleLoop,
                setVolume: handleSetVolume,
                next: handleNext, 
                back: handleBack,
                shuffle: handleShuffle
            },
            state: {
                activeSong: activeSong,
                playing: playerState.playing,
                looping: playerState.looping,
                volume: playerState.volume
            }
        }}>
            { children }
            {/* <webview id="yt-view" ref={ytRef} style={{ display: "none"}} /> */}
        </MusicPlayerContext.Provider>
    )
}