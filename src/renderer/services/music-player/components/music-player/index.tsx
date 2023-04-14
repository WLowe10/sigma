import { useMusic } from "@renderer/services/music-player/hooks";
import { SongControls } from "../song-controls";
import { AudioControls } from "../audio-controls";
import { motion, AnimatePresence} from "framer-motion";
import { Flex, Stack, Image } from "@chakra-ui/react";

const variants = {
    open: {
        marginBottom: 0,
        transition: {
            type: "spring",
            duration: .25,
        }
    },
    closed: {
        marginBottom: -100,
        transition: {
            type: "spring",
            duration: .25,
        }
    }
}

export const MusicPlayer = () => {
    const { controls, state } = useMusic();

    return (
        <Flex bg={"blackAlpha.500"} width={"100%"}>
            <Stack direction={"row"}>

            </Stack>
        </Flex>
    )
};

                /* <div className={classes.info}>
                    <img className={classes.thumbnail} src={`./songs/thumbnails/${state.activeSong.id}.png`} />
                    <div className={classes.songInfo}>
                        <p className={classes.songTitle}>
                            {
                                state.activeSong.title
                            }
                        </p>
                        <p className={classes.songArtist}>
                            {
                                state.activeSong.artist
                            }
                        </p>
                    </div>
                </div>
     */
               /* <SongControls />
               <AudioControls /> */