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

        if (play) {
            setPlaying(true)
        };
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
        // const audioContext = new AudioContext();
        // const source = audioContext.createBufferSource();
        // const mediaSource = new MediaSource();
        // const audio = new Audio();
        // audio.src = URL.createObjectURL(mediaSource);

        // mediaSource.addEventListener("sourceopen", () => {
        //     const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");

        //     window.electron.songsService.on(IpcKeys.SONG_STREAM, (data) => {
        //         if (data.buffer) {
        //             // audioContext.decodeAudioData(data.buffer, (audioBuffer) => {
        //             // source.buffer = data.buffer;

        //             // source.connect(audioContext.destination);
        //             // source.start();
        //             sourceBuffer.appendBuffer(data.buffer)
        //             audio.play()
        //         } else {
        //             console.log("playing")
        //             mediaSource.endOfStream();
        //         }
        //     });
        // });


        // window.electron.songsService.on(IpcKeys.SONG_STREAM, (data) => {
        //     const source = audioContext.createBufferSource();
        //     if (data.buffer) {
        //         audioContext.decodeAudioData(data.buffer, (audioBuffer) => {
        //             source.buffer = data.buffer;

        //             source.connect(audioContext.destination);
        //             source.start();
        //         });
        //     }
        // });

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
            {/* <webview id="yt-view" src={"https://www.youtube.com/watch?v=C_MuKHTGM-c"} style={{ display: "none" }}/> */}
            {
                children
            }
        </MusicPlayerContext.Provider>
    )
}