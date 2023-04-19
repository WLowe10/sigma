import React from "react";
import type { SongType } from "@global/types";

export type MusicPlayerContextType = {
     controls: {
          setSong: (id: string, play?: boolean) => void,
          play: () => void,
          pause: () => void,
          loop: () => void,
          back: () => void,
          next: () => void,
          shuffle: () => void
          // toggleLoop: () => void,
          // setVolume: (level: number) => void,
          // registerTimeEvent: (cb: any) => void,
          // clearTimeEvent: () => void,
     },
     state: {
          playing: boolean,
          looping: boolean
          activeSong: string | null
     }
};

export const MusicPlayerContext = React.createContext<MusicPlayerContextType | null>(null)