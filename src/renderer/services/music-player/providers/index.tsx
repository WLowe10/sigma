import { useState, ReactNode, useRef, useEffect } from "react";
import { MusicPlayerContext } from "../context";
import { audioManager } from "../managers";
import { useSongs } from "@renderer/services/songs/hooks";
import { IpcKeys } from "@global/constants";
import { Howl } from "howler";
import { useSongsStore } from "@renderer/services/songs/store";
import type { SongType } from "@global/types";

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
    const [activeSong, setActiveSong] = useState<SongType | null>(null);
    const [playing, setPlaying] = useState(false);
    const [looping, setLooping] = useState(false);
    const songs = useSongsStore(state => state.songs);
    const audio = useRef<Howl | null>(null);

    const handleSetSong = (id: string) => {
        const song = songs.find(song => song.id == id);
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
        if (!audio.current) return;

        // await audio.current.fade(audio.current.volume(), 0, 500);
        audio.current.pause();
        setPlaying(false);
    };

    const handleSetLoop = () => {
        if (!audio.current) return;

        audio.current.loop();
        setLooping(true);
    };

    useEffect(() => {
        let chunks: any = [];

        window.electron.songsService.on(IpcKeys.SONG_STREAM, (data) => {
            if (data.type == "chunk") {
                chunks.push(data.chunk)
            } else if (data.type == "end") {
                const blob = new Blob(chunks, { type: "audio/mp3" })
                const blobUrl = URL.createObjectURL(blob);

                audio.current = (
                    new Howl({
                        src: blobUrl,
                        format: "mp3",
                        volume: .5,
                        onend: () => {
                            setPlaying(false);
                        },
                    })
                )

                audio.current.play();
            }
        })
    }, [])

    return (
        <MusicPlayerContext.Provider value={{ 
            controls: {
                setSong: handleSetSong,
                play: handlePlay,
                pause: handlePause,
                loop: handleSetLoop
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