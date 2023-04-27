import { useMusic } from "@renderer/services/music-player/hooks";
import { Flex, Stack, Image, Text, Center, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, SlideFade, Button, IconButton, Slide, useBoolean } from "@chakra-ui/react";
import { 
    IconPlayerPlayFilled, 
    IconPlayerPauseFilled, 
    IconPlayerSkipBackFilled, 
    IconPlayerSkipForwardFilled, 
    IconRepeat, 
    IconArrowsShuffle,
    IconVolume3,
    IconVolume2,
    IconVolume,
} from "@tabler/icons-react";
import { useSong } from "@renderer/services/songs/hooks";
import { formatSeconds } from "@global/utils";

export const MusicPlayer = () => {
    const { controls: musicControls, state: musicState } = useMusic();
    const [seekHovered, setSeekHovered] = useBoolean(false);
    const [volumeHovered, setVolumeHovered] = useBoolean(false);
    const [durationLeft, setDurationLeft] = useBoolean(false);
    const activeSong = useSong(musicState.activeSong);

    const handleSetVolume = (newVol: number) => {
        musicControls.setVolume(newVol);
    };

    if (!activeSong) return null;

    return (
        <SlideFade in={!!musicState.activeSong}>
            <Box bg={"gray.900"} height={"120px"}>
                <Stack direction={"row"} paddingInline={8} pt={4}>
                    <Text fontSize={"sm"} color={"gray.500"}>
                        {
                            formatSeconds(musicState.time)
                        }
                    </Text>
                    <Slider 
                        orientation={"horizontal"} 
                        //!fix progress
                        value={musicState.progress || 0} 
                        onChange={musicControls.seek} 
                        onMouseEnter={setSeekHovered.on} 
                        onMouseLeave={setSeekHovered.off}
                    > 
                        <SliderTrack>
                            <SliderFilledTrack bg={"blue.600"}/>
                        </SliderTrack>
                        {
                            seekHovered && <SliderThumb />
                        }
                    </Slider>
                    <Text onClick={setDurationLeft.toggle} color={"gray.500"} fontSize={"sm"} _hover={{ cursor: "default" }}>
                        {
                            durationLeft ? (
                                "-" + formatSeconds((musicState.duration || activeSong.duration) - musicState.time)
                            ) : (
                                formatSeconds(musicState.duration || activeSong.duration)
                            )
                        }
                    </Text>
                </Stack>
                <Flex width={"100%"} justify={"space-between"} p={2}>
                    <Stack direction={"row"} alignItems={"center"} overflow={"hidden"} flex={1}>
                        <Image src={activeSong.thumbnail} height={"4rem"} width={"4rem"} objectFit={"cover"}/>
                        <Stack direction={"column"} spacing={0}>
                            <Text fontWeight={"bold"} textOverflow={"ellipsis"} whiteSpace={"nowrap"}>
                                {
                                    activeSong.title
                                }
                            </Text>
                            <Text color={"gray.500"}>
                                {
                                    activeSong.artist
                                }
                            </Text>
                        </Stack>
                    </Stack>

                    <Stack direction={"row"} spacing={"6"} justifyContent={"center"} alignItems={"center"} flex={1}>
                        <IconButton aria-label={"shuffle"} onClick={musicControls.shuffle} size={"sm"}>
                            <IconArrowsShuffle color={musicState.shuffling ? "#4EC486" : undefined}/>
                        </IconButton>

                        <IconButton aria-label={"back"} onClick={musicControls.back}>
                            <IconPlayerSkipBackFilled />
                        </IconButton>
                        <IconButton aria-label={""} onClick={musicState.playing ? musicControls.pause : musicControls.play} isLoading={musicState.buffering}>
                            {
                                musicState.playing ? (
                                    <IconPlayerPauseFilled />
                                ) : (
                                    <IconPlayerPlayFilled />
                                )
                            }
                        </IconButton>
                        <IconButton aria-label={"next"} onClick={musicControls.next}>
                            <IconPlayerSkipForwardFilled  />
                        </IconButton>

                        <IconButton aria-label={"loop"} onClick={musicControls.loop} size={"sm"}>
                            <IconRepeat color={musicState.looping ? "#4EC486" : undefined}/>
                        </IconButton>
                    </Stack>

                    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} flex={1}>
                        <IconButton aria-label={"toggle-mute"} bg={"gray.900"} size={"sm"} onClick={musicControls.mute}>
                        {
                            musicState.muted ? (
                                <IconVolume3 />
                            ) : (
                                musicState.volume < 50 ? (
                                    <IconVolume2 />
                                ) : (
                                    <IconVolume />
                                )
                            )
                        }
                        </IconButton>
                        <Slider 
                            orientation={"horizontal"} 
                            value={musicState.muted ? 0 : musicState.volume} 
                            w={"50%"} 
                            onClick={setVolumeHovered.on}
                            onChange={handleSetVolume}
                            onMouseEnter={setVolumeHovered.on} 
                            onMouseLeave={setVolumeHovered.off}
                        >
                            <SliderTrack>
                                <SliderFilledTrack bg={"blue.600"}/>
                            </SliderTrack>
                            {
                                volumeHovered && <SliderThumb />
                            }
                        </Slider>
                    </Stack>
                </Flex>
            </Box>
        </SlideFade>
    )
};