import { useState, ReactNode, useRef } from "react";
import { MusicPlayerContext } from "../context";
import { audioManager } from "../managers";
import type { SongType } from "@global/types";
import { useSongs } from "@services/songs/hooks";

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
    //const controls = createControls(audioManager);
    const { songs } = useSongs();
 
    const [activeSong, setActiveSong] = useState<SongType | null>(null);
    const [playing, setPlaying] = useState(false);

    const controls = {
        play() {
            setPlaying(true);
            audioManager.play();
        },
        pause() {
            setPlaying(false);
            audioManager.pause();
        },
        setSong(id: string) {
            this.pause() //pause audio if song is switched

            if (!songs) return;
            const song = songs.find(s => s.id == id);

            if (song) {
                setActiveSong(song);
                audioManager.setSource(`./songs/audio/${song.id}.mp3`)
            }
        },
        setVolume(level: number) {
            audioManager.setVolume(level)
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