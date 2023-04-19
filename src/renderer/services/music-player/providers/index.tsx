import { useState, ReactNode, useRef, useEffect } from "react";
import { MusicPlayerContext } from "../context";
import { IpcKeys } from "@global/constants";
import { Howl } from "howler";
import { useSongsStore } from "@renderer/services/songs/store";
import { shuffle } from "@renderer/utils";
import type { SongType } from "@global/types";

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
    const [activeSong, setActiveSong] = useState<string | null>(null);
    const [activePlaylist, setActivePlaylist] = useState<string | null>(null);
    const [playing, setPlaying] = useState(false);
    const [looping, setLooping] = useState(false);
    const getSongs = useSongsStore(state => state.getSongs);
    const getAllSongs = useSongsStore(state => state.getAll);
    // const audio = useRef<Howl | null>(null);

    const handleSetSong = (songId: string, play?: boolean) => {
        const song = getSongs([songId])[0];
        if (!song) return;

        setPlaying(false);
        setActiveSong(songId);

        if (play) setPlaying(true);
    };

    const handlePlay = () => {
        if (!activeSong) return;
        const songData = getSongs([activeSong])[0];

        // window.electron.songsService.playSong(songData.url);

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
    
    useEffect(() => {
        const mediaSource = new MediaSource();
        const streamUrl = URL.createObjectURL(mediaSource);
        const audio = new Audio(streamUrl);

        const audioContext = new AudioContext();
        const source = audioContext.createBufferSource();

        window.electron.songsService.on(IpcKeys.SONG_STREAM, (data) => {
            console.log(data.buffer)
            // source.buffer = new AudioBuffer(data.buffer);
            // source.connect(audioContext.destination)
            // source.start();

            // audioContext.decodeAudioData(data.buffer, (audioBuffer) => {
            //     source.buffer = audioBuffer;

            //     source.connect(audioContext.destination);
            //     source.start();

            //     setTimeout(() => {
            //         source.stop();
            //     }, 1000)
            // });

            console.log(data.buffer)
        });

        // const audio2 = new Howl({
        //     src: [],
        //     format: "mp3",
        //     volume: .5,
        //     onend: () => {
        //         setPlaying(false);
        //     },
        // })

        // audio2.play()

        // mediaSource.addEventListener("sourceopen", () => {
        //     const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");

        //     window.electron.songsService.on(IpcKeys.SONG_STREAM, (data) => {
        //         if (data.type == "chunk") {
        //             sourceBuffer.appendBuffer(data.buffer);
        //         }

        //         else if (data.type == "end") { 
        //             console.log("done")
        //             audio.play()
        //         };
        //     })

        //     // sourceBuffer.addEventListener("updateend", () => {
        //     //     audio.play() 
        //     // });

        //     // audio.play();
        // });
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