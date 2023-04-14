import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { MusicPlayerProvider } from "@services/music-player/providers";
import { SongsProvider } from "@services/songs/providers";

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <SongsProvider>
            <MusicPlayerProvider>
                {  children }
                <ToastContainer />
            </MusicPlayerProvider>     
        </SongsProvider>
    )
};