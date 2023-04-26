import { useSongsStore } from "@renderer/services/songs/store";
import { useEffect } from "react";

export const useDiscordRPC = (songId: string | null) => {
    const getSongs = useSongsStore(state => state.getSongs);

    useEffect(() => {
        if (!songId) return;

        const songData = getSongs([songId])[0];
        if (!songData) return;

        window.electron.rpcService.setListening(songData.title);
    }, [songId])
};