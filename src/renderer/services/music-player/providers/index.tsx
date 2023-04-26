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
    const activeSongRef = useRef<string | null>(null);
    const getSongs = useSongsStore(state => state.getSongs);
    const getAllSongs = useSongsStore(state => state.getAll);
    const getPlaylistSongs = usePlaylistsStore(state => state.getSongs);
    // const bumpSong = useSongsStore(state => state.bumpSong);
    const { get: getShuffle, set: setShuffle } = useShuffle<SongType>((song) => song.id);

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
    const handleSetSong = (songId: string) => {
        if (songId == activeSong) return;

        const song = getSongs([songId])[0];
        if (!song) return;

        playerControls.load(song.url);
        setActiveSong(songId);
    };

    const handlePlay = () => {
        // const songData = getSongs([activeSong])[0];
        playerControls.play();
    };

    const handlePause = () => {
        // await audio.current.fade(audio.current.volume(), 0, 500);
        playerControls.pause();
    };

    const handleNext = async () => {
        const nextSong = getNextSong();

        if (nextSong) {
            await playerControls.load(nextSong.url);
            playerControls.play();
            setActiveSong(nextSong.id);
        };
    };

    const handleBack = async () => {
        const prevSong = getPreviousSong();

        if (prevSong) {
            await playerControls.load(prevSong.url);
            playerControls.play();
            setActiveSong(prevSong.id);
        };
    };

    const handleSeek = (to: number) => {
        console.log(to)
    };

    const handleToggleShuffle = () => {
        setShuffling(prev => !prev);
    };

    const getNextSong = () => {
        if (!activeSong) return;
        let nextSong = null;

        if (shuffling) {
            const nextSong = getShuffle();
            console.log("next shuffle: ", nextSong)
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
    useEffect(() => {
        setShuffle(
            [
		{
			"id": "a1a917ea-ac91-4d27-98f4-ca2a3f23b9bf",
			"url": "https://www.youtube.com/watch?v=6PRYW7rfb24",
			"title": "The Music Of The Night (From 'The Phantom Of The Opera' Motion Picture)",
			"artist": "Andrew Lloyd Webber - Topic",
			"date": "2018-07-28",
			"duration": 343,
			"thumbnail": "https://i.ytimg.com/vi/6PRYW7rfb24/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBH_qw9MFYCaEwM8glp7sIqsUyRsw"
		},
		{
			"id": "ad4ea026-0eab-41b1-b7c0-9b5d8fd695fd",
			"url": "https://www.youtube.com/watch?v=mI8bxDHstlI",
			"title": "Nobody Is Talking About This Problem",
			"artist": "penguinz0",
			"date": "2023-04-25",
			"duration": 659,
			"thumbnail": "https://i.ytimg.com/vi/mI8bxDHstlI/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCaEukpy9IzD8z5K4bskwYKlDF_cA"
		},
		{
			"id": "71f8409b-476f-4094-a300-e9675733947b",
			"url": "https://www.youtube.com/watch?v=NoEMIVx4J78",
			"title": "MAGIC! - Rude (Lyrics)",
			"artist": "7clouds",
			"date": "2021-10-03",
			"duration": 224,
			"thumbnail": "https://i.ytimg.com/vi/NoEMIVx4J78/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAUzG6GgWUHPfJmGT9v9QqG6l0X8w"
		},
		{
			"id": "f8d72325-261c-415e-9148-589cc4772f33",
			"url": "https://www.youtube.com/watch?v=Tjp8cj8Vzyo",
			"title": "Davy Jones",
			"artist": "Hans Zimmer - Topic",
			"date": "2018-11-24",
			"duration": 196,
			"thumbnail": "https://i.ytimg.com/vi/Tjp8cj8Vzyo/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBWkPIeIOEyRSU_ZdNcIWUJF4137Q"
		},
		{
			"id": "96d13d0b-4933-4e00-ac12-f83c9e4992ea",
			"url": "https://www.youtube.com/watch?v=jhFDyDgMVUI",
			"title": "One Second Video",
			"artist": "WaitOneSecondHere",
			"date": "2011-10-14",
			"duration": 1,
			"thumbnail": "https://i.ytimg.com/vi/jhFDyDgMVUI/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-BIAC4AOKAgwIABABGGUgZShlMA8=&rs=AOn4CLDZLAvkLi6xLlffVYgm4b-kB35LBQ"
		}
	]
        );
    }, [])

    useDiscordRPC(activeSong);

    return (
        <MusicPlayerContext.Provider value={{ 
            controls: {
                setSong: handleSetSong,
                play: handlePlay,
                pause: handlePause,
                loop: playerControls.toggleLoop,
                setVolume: playerControls.setVolume,
                mute: playerControls.toggleMute,
                next: handleNext, 
                back: handleBack,
                shuffle: handleToggleShuffle,
                seek: handleSeek
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