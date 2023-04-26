import { usePlaylistsStore } from "../store";

export const usePlaylist = (playlistId?: string | null) => {
    return usePlaylistsStore(state => playlistId && state.playlists.find(pl => pl.id == playlistId));
};