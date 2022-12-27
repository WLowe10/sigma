import { useState, ReactNode, useRef } from "react";
import { MusicPlayerContext } from "../context";
import { AudioManager } from "../managers";
import { createControls } from "./createControls";
import type { SongType } from "@global/types";

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
    const audioManager = useRef(new AudioManager());
    //const controls = createControls(audioManager);

    const [activeSong, setActiveSong] = useState<SongType | null>(null);
    const [playing, setPlaying] = useState(false);

    const controls = {
        play() {
            setPlaying(true);
            audioManager.current.play();
        },
        pause() {
            setPlaying(false);
            audioManager.current.pause();
        },
        setSong(id: string) {
            setActiveSong({
                title: "Battle Hymn Of The Republic",
                artist: "John Mcdermott"
            })
        },
        setVolume(level: number) {
            audioManager.current.setVolume(level)
        }
    };

    const state = {
        playing, 
        activeSong
    }
   

    return (
        <MusicPlayerContext.Provider value={{ controls, state }}>
            {
                children
            }
        </MusicPlayerContext.Provider>
    )
}