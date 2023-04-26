import { useMusic } from "@renderer/services/music-player/hooks";
import { memo, useEffect, useState } from "react";
import { useAudioDuration } from "@renderer/hooks";
import { Text, Image, CardHeader, Stack, Tr, Td, Menu, MenuButton, MenuList, MenuItem, Center, chakra, useTheme, IconButton, Box, Tooltip } from "@chakra-ui/react";
import { IconDotsVertical, IconPlayerPlayFilled } from "@tabler/icons-react";
import { useSongs } from "@renderer/services/songs/hooks";
import { motion } from "framer-motion"  
import { useToken } from "@chakra-ui/react";
import { usePlaylists } from "@renderer/services/playlists/hooks";
import { usePlaylistsStore } from "@renderer/services/playlists/store";
import { AudioIcon } from "../icons";
import { IconPlayerPauseFilled } from "@tabler/icons-react";
import { formatSeconds } from "@global/utils";
import isEqual from "react-fast-compare";
import type { SongType } from "@global/types";

type Props = {
    song: SongType,
    playing: boolean,
    active: boolean,
    index: number,
    playlist?: string,
};

export const Song = memo(({ song, active, playing, playlist, index }: Props) => {
    const { id, title, thumbnail, artist, date } = song;
    const { controls: songControls } = useSongs();
    const { controls: musicControls } = useMusic();
    const { controls: playlistControls } = usePlaylists();
    const [blackAlpha600, green300] = useToken("colors", ["blackAlpha.600", "green.300"])
    const [hovered, setHovered] = useState(false);
    const playlists = usePlaylistsStore(state => state.playlists);
    // console.log("RENDERED: ", title)
    // console.log(playing, title)

    const handlePlaySong = (e: any) => {
        e.stopPropagation();

        if (!active) {
            musicControls.setSong(id);
            musicControls.play();
            return;
        };

        musicControls.play();
    };

    const handlePauseSong = (e: any) => {
        e.stopPropagation();

        musicControls.pause();
    };

    const handleSelectSong = () => {
        musicControls.setSong(id);
    };

    const handleDeleteSong = () => {
        songControls.deleteSongs([id]);
    };

    const handleAddToPlaylist = (playlistId: string) => {
        playlistControls.addSongs(playlistId, [song.id])
    };

    return (
        <Tr 
            onClick={handleSelectSong} 
            as={motion.tr} 
            whileHover={{ backgroundColor: blackAlpha600 }} 
            onHoverStart={() => setHovered(true)} 
            onHoverEnd={() => setHovered(false)}
            _hover={{ cursor: "default" }}
        >
            <Td w={"4rem"}>
                <Center>
                    {
                        !hovered ? (
                            playing ? (
                                <Box>
                                    <AudioIcon fill={green300} height={16} width={16}/>
                                </Box>
                            ) : (
                                <Text color={active ? green300 : undefined}>
                                    {
                                        index + 1
                                    }
                                </Text>
                            )
                        ) : (
                            playing ? (
                                <Tooltip label={"Pause"} openDelay={500} placement={"top"} bg={"gray.700"} color={"white"}>
                                    <IconButton aria-label={"pause"} size={"xs"} onClick={handlePauseSong}>
                                        <IconPlayerPauseFilled size={16} />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip label={`Play ${song.title}`} openDelay={500} placement={"top"} bg={"gray.700"} color={"white"}>
                                    <IconButton aria-label={"play"} size={"xs"} onClick={handlePlaySong}>
                                        <IconPlayerPlayFilled size={16} />
                                    </IconButton>
                                </Tooltip>
                            )
                        )
                    }
                </Center>
            </Td>
            <Td>
                <Stack direction={"row"} alignItems={"center"}>
                    <Image src={song.thumbnail} height={"3rem"} objectFit={"cover"} />
                    <Stack direction={"column"} justifyContent={"center"} overflow={"hidden"}>
                        <Text fontWeight={"semibold"}>
                            {
                                song.title
                            }
                        </Text>
                        <Text>
                            {
                                song.artist
                            }
                        </Text>
                    </Stack>
                </Stack>
            </Td>
            <Td>
                {
                    song.date
                }
            </Td>
            <Td>
                {
                    formatSeconds(song.duration) 
                }
            </Td>
            <Td>
                <Menu>
                    <MenuButton onClick={(e: any) => e.stopPropagation()}>
                        <IconButton as={"div"} aria-label={"more options"} size={"xs"}>
                            <IconDotsVertical size={16}/>
                        </IconButton>
                    </MenuButton>
                    <MenuList>
                        {
                            playlists.map(pl => (
                                <MenuItem onClick={(e: any) => {
                                    e.stopPropagation();
                                    handleAddToPlaylist(pl.id)
                                }} key={pl.id}>
                                    Add to { pl.name }
                                </MenuItem>
                            ))
                        }
                        <MenuItem onClick={handleDeleteSong}>
                            Remove
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Td>
        </Tr> 
    )
}, isEqual);