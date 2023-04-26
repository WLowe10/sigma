import React from "react";

export type MusicPlayerContextType = {
     controls: {
          setSong: (id: string, play?: boolean) => void,
          play: () => void,
          pause: () => void,
          setVolume: (volume: number) => void,
          loop: () => void,
          mute: () => void,
          back: () => void,
          next: () => void,
          shuffle: () => void,
          seek: (to: number) => void,
          // toggleLoop: () => void,
          // setVolume: (level: number) => void,
          // registerTimeEvent: (cb: any) => void,
          // clearTimeEvent: () => void,
     },
     state: {
          playing: boolean,
          duration: number,
          time: number,
          progress: number,
          looping: boolean,
          muted: boolean,
          shuffling: boolean,
          buffering: boolean,
          volume: number,
          activeSong: string | null,
     }
};

export const MusicPlayerContext = React.createContext<MusicPlayerContextType | null>(null)