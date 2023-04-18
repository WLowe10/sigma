import { useMusic } from "@renderer/services/music-player/hooks";
import { SongControls } from "../song-controls";
import { AudioControls } from "../audio-controls";
import { motion, AnimatePresence} from "framer-motion";
import { Flex, Stack, Image, Text, Center, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, SlideFade } from "@chakra-ui/react";
import { IconPlayerPlayFilled, IconPlayerPauseFilled, IconPlayerSkipBackFilled, IconPlayerSkipForwardFilled } from "@tabler/icons-react";

export const MusicPlayer = () => {
    const { controls: musicControls, state: musicState } = useMusic();

    if (!musicState.activeSong) return null;

    return (
        <Box borderTopWidth={"1px"}>
            <Flex width={"100%"} justify={"space-between"}>
                <Stack direction={"row"} alignItems={"center"} flex={1}>
                    <Image src={musicState.activeSong.thumbnail} height={"5rem"} objectFit={"cover"}/>
                    <Stack direction={"column"}>
                        <Text>
                            {
                                musicState.activeSong.title
                            }
                        </Text>
                        <Text>
                            {
                                musicState.activeSong.artist
                            }
                        </Text>
                    </Stack>
                </Stack>

                <Stack direction={"row"} spacing={"6"} justifyContent={"center"} alignItems={"center"} flex={1}>
                    <IconPlayerSkipBackFilled />
                    {
                        musicState.playing ? (
                            <IconPlayerPauseFilled onClick={musicControls.pause}/>
                        ) : (
                            <IconPlayerPlayFilled onClick={musicControls.play}/>
                        )
                    }
                    <IconPlayerSkipForwardFilled />
                </Stack>

                <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} flex={1}>
                    <Slider orientation={"horizontal"} defaultValue={30} w={"50%"}>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </Stack>
            </Flex>
        </Box>
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