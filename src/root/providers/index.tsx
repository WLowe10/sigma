import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { MusicPlayerProvider } from "@services/music-player/providers";

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
         <MusicPlayerProvider>
            {  children }
            <ToastContainer />
        </MusicPlayerProvider>       
    )
};