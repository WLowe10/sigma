import { Children, ReactNode } from "react";

import { MusicPlayerProvider } from "@services/music-player/providers";

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <MusicPlayerProvider>
            {  children }
        </MusicPlayerProvider>
    )
};