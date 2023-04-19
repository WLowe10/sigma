import { useContext } from "react";
import { SongsContext, SongsContextType } from "../context";

export const useSongs = () => {
    const songProvider = useContext(SongsContext) as SongsContextType;
    return songProvider;
};