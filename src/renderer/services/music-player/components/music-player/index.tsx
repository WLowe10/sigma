import { useMusic } from "@renderer/services/music-player/hooks";
import { SongControls } from "../song-controls";
import { AudioControls } from "../audio-controls";
import { motion, AnimatePresence} from "framer-motion";
import { Flex, Stack, Image, Text, Center, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, SlideFade, Button, IconButton, Slide } from "@chakra-ui/react";
import { IconPlayerPlayFilled, IconPlayerPauseFilled, IconPlayerSkipBackFilled, IconPlayerSkipForwardFilled, IconRepeat, IconArrowsShuffle } from "@tabler/icons-react";

export const MusicPlayer = () => {
    const { controls: musicControls, state: musicState } = useMusic();
    if (!musicState.activeSong) return null;

    return (
        <SlideFade in={!!musicState.activeSong}>
        <Box borderTopWidth={"1px"} p={"4"}>
            <Flex width={"100%"} justify={"space-between"}>
                <Stack direction={"row"} alignItems={"center"} flex={1}>
                    <Image src={musicState.activeSong.thumbnail} height={"4rem"} width={"4rem"} objectFit={"cover"}/>
                    <Stack direction={"column"} spacing={0}>
                        <Text fontWeight={"bold"}>
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
                    <IconButton aria-label={"shuffle"} onClick={musicControls.shuffle} size={"sm"}>
                        <IconArrowsShuffle />
                    </IconButton>

                    <IconButton aria-label={"back"} onClick={musicControls.back}>
                        <IconPlayerSkipBackFilled />
                    </IconButton>
                    {
                        musicState.playing ? (
                            <IconButton aria-label={"pause"} onClick={musicControls.pause}>
                                <IconPlayerPauseFilled />
                            </IconButton>
                        ) : (
                            <IconButton aria-label={"play"} onClick={musicControls.play}>
                                <IconPlayerPlayFilled />
                            </IconButton>
                        )
                    }
                    <IconButton aria-label={"next"} onClick={musicControls.next}>
                        <IconPlayerSkipForwardFilled  />
                    </IconButton>

                    <IconButton aria-label={"loop"} onClick={musicControls.loop} size={"sm"}>
                        <IconRepeat color={musicState.looping ? "#4EC486" : undefined}/>
                    </IconButton>
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
        </SlideFade>
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