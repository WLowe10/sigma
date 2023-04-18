import { useState, ReactNode, useRef, useEffect } from "react";
import { MusicPlayerContext } from "../context";
import { IpcKeys } from "@global/constants";
import { Howl } from "howler";
import { useSongsStore } from "@renderer/services/songs/store";
import type { SongType } from "@global/types";

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
    const [activeSong, setActiveSong] = useState<SongType | null>(null);
    const [playing, setPlaying] = useState(false);
    const [looping, setLooping] = useState(false);
    const getSongs = useSongsStore(state => state.getSongs);
    const getAllSongs = useSongsStore(state => state.getAll);
    // const audio = useRef<Howl | null>(null);

    const handleSetSong = (id: string) => {
        const song = getSongs([id])[0];
        if (!song) return;

        setActiveSong(song);
    };

    const handlePlay = () => {
        if (!activeSong) return;
        window.electron.songsService.playSong(activeSong.url);
        // audio.current.play();
        setPlaying(true)
    };

    const handlePause = () => {
        // await audio.current.fade(audio.current.volume(), 0, 500);
        setPlaying(false);
    };

    const handleToggleLoop = () => {
        // audio.current.loop();
        setLooping(prev => !prev);
    };

    const handleNext = () => {
        if (!activeSong) return;

        const allSongs = getAllSongs();
        const currentSongId = activeSong.id;
        const currentIdx = allSongs.findIndex(song => song.id == currentSongId);
        const nextSong = allSongs[currentIdx + 1] || allSongs[0];

        setActiveSong(nextSong);
    };

    const handleBack = () => {
        if (!activeSong) return;

        const allSongs = getAllSongs();
        const currentSongId = activeSong.id;
        const currentIdx = allSongs.findIndex(song => song.id == currentSongId);
        const nextSong = allSongs[currentIdx - 1] || allSongs[allSongs.length - 1];

        setActiveSong(nextSong);
    };

    const handleShuffle = () => {
        console.log("shuffled")
    };
    
    useEffect(() => {
        const mediaSource = new MediaSource();
        const streamUrl = URL.createObjectURL(mediaSource);
        const audio = new Audio(streamUrl);

        // const audio2 = new Howl({
        //     src: [],
        //     format: "mp3",
        //     volume: .5,
        //     onend: () => {
        //         setPlaying(false);
        //     },
        // })

        // audio2.play()

        mediaSource.addEventListener("sourceopen", () => {
            const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");

            window.electron.songsService.on(IpcKeys.SONG_STREAM, (data) => {
                if (data.type == "chunk") {
                    console.log("chunk")
                    sourceBuffer.appendBuffer(data.chunk);
                }

                else if (data.type == "end") { 
                    console.log("done")
                };
            })

            sourceBuffer.addEventListener("updateend", () => {
                audio.play() 
            });

            // audio.play();

            audio.addEventListener("canplay", () => {
                // mediaSource.endOfStream();
                console.log("Audio can play");
                audio.play();
            });

        });

        audio.addEventListener("error", (err) => {
            console.log(err)
        })
    }, [])

    return (
        <MusicPlayerContext.Provider value={{ 
            controls: {
                setSong: handleSetSong,
                play: handlePlay,
                pause: handlePause,
                loop: handleToggleLoop,
                next: handleNext, 
                back: handleBack,
                shuffle: handleShuffle
            },
            state: {
                activeSong: activeSong,
                playing: playing,
                looping: looping
            }
        }}>
            {
                children
            }
        </MusicPlayerContext.Provider>
    )
}