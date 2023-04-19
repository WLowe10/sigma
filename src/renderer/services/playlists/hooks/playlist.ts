import { usePlaylistsStore } from "../store";

export const usePlaylist = (playlistId: string) => {
    return usePlaylistsStore(state => state.playlists.find(pl => pl.id == playlistId));
};