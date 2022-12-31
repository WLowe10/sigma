import { useContext } from "react";
import { MusicPlayerContext, MusicPlayerContextType } from "../context";

export const useMusic = () => {
    const musicState = useContext(MusicPlayerContext) as MusicPlayerContextType;
    return musicState;
};