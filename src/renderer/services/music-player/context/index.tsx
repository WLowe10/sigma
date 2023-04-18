import React from "react";
import type { SongType } from "@global/types";

export type MusicPlayerContextType = {
     controls: {
          setSong: (id: string) => void,
          play: () => void,
          pause: () => void,
          loop: () => void,
          // toggleLoop: () => void,
          // setVolume: (level: number) => void,
          // registerTimeEvent: (cb: any) => void,
          // clearTimeEvent: () => void,
     },
     state: {
          playing: boolean,
          looping: boolean
          activeSong: SongType | null
     }
};

export const MusicPlayerContext = React.createContext<MusicPlayerContextType | null>(null)