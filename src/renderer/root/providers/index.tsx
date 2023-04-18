import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { MusicPlayerProvider } from "@renderer/services/music-player/providers";
import { SongsProvider } from "@renderer/services/songs/providers";
import { theme } from "@renderer/constants/theme";

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <ChakraProvider resetCSS={true} theme={theme}>
            <SongsProvider>
                <MusicPlayerProvider>
                    {  children }
                </MusicPlayerProvider>     
            </SongsProvider>
        </ChakraProvider>
    )
};