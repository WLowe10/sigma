import React from "react";
import type { SongType } from "@renderer/types";

export type MusicPlayerContextType = {
     audioObj: HTMLAudioElement
     controls: {
          play: () => void,
          pause: () => void,
          toggleLoop: () => void,
          setSong: (id: string) => void,
          setVolume: (level: number) => void,
          registerTimeEvent: (cb: any) => void,
          clearTimeEvent: () => void,
     },
     state: {
          details: {
               playing: boolean,
               loop: boolean
          }
          activeSong: SongType | null
     }
};

export const MusicPlayerContext = React.createContext<MusicPlayerContextType | null>(null)