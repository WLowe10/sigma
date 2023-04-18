import { useContext } from "react";
import { PlaylistsContext } from "../context";
import type { PlaylistsContextType } from "../context";

export const usePlaylists = () => {
    return useContext(PlaylistsContext) as PlaylistsContextType
};