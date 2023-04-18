import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { MusicPlayerProvider } from "@renderer/services/music-player/providers";
import { SongsProvider } from "@renderer/services/songs/providers";

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <ChakraProvider resetCSS={true}>
            <SongsProvider>
                <MusicPlayerProvider>
                    {  children }
                </MusicPlayerProvider>     
            </SongsProvider>
        </ChakraProvider>
    )
};