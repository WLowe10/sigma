import { useState, ReactNode, useRef } from "react";
import { MusicPlayerContext } from "../context";
import { audioManager } from "../managers";
import { useSongs } from "@renderer/services/songs/hooks";
import type { SongType } from "@renderer/global/types";

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
    const { songs } = useSongs();
    const [activeSong, setActiveSong] = useState<SongType | null>(null);
    const [playing, setPlaying] = useState(false);
    const [looping, setLooping] = useState(false);

    audioManager.audio.addEventListener("ended", () => {
        setPlaying(false);
    })

    const controls = {
        play() {
            setPlaying(true);
            audioManager.play();
        },
        pause() {
            setPlaying(false);
            audioManager.pause();
            
        },
        toggleLoop() {
            setLooping(prev => !prev);
            audioManager.toggleLoop();
        },
        setSong(id: string) {
            this.pause() //pause audio if song is switched

            const song = songs?.find(s => s.id == id);
            if (!song) return;
            
            setActiveSong(song);
            audioManager.setSource(`./songs/audio/${song.id}.mp3`)
        },
        setVolume(level: number) {
            audioManager.setVolume(level)
        },
        registerTimeEvent(cb: any) {
            audioManager.registerTimeEvent(cb);
        },
        clearTimeEvent() {
            audioManager.clearTimeEvent();
        }
    };

    const details = {
        loop: looping,
        playing: playing, 
    };

    const state = {
        details,
        activeSong
    };

    return (
        <MusicPlayerContext.Provider value={{ audioObj: audioManager.audio, controls, state }}>
            {
                children
            }
        </MusicPlayerContext.Provider>
    )
}