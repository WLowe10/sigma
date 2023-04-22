import { useMusic } from "@renderer/services/music-player/hooks";
import { memo, useEffect, useState } from "react";
import { useAudioDuration } from "@renderer/hooks";
import { Text, Image, CardHeader, Stack, Tr, Td, Menu, MenuButton, MenuList, MenuItem, Center, chakra, useTheme, IconButton, Box } from "@chakra-ui/react";
import { IconDotsVertical, IconPlayerPlayFilled } from "@tabler/icons-react";
import { useSongs } from "@renderer/services/songs/hooks";
import { motion } from "framer-motion"  
import { useToken } from "@chakra-ui/react";
import { usePlaylists } from "@renderer/services/playlists/hooks";
import { usePlaylistsStore } from "@renderer/services/playlists/store";
import { AudioIcon } from "../icons";
import { IconPlayerPauseFilled } from "@tabler/icons-react";
import type { SongType } from "@global/types";

type Props = {
    song: SongType,
    playing: boolean,
    playlist?: string,
    index: number
};

export const Song = memo(({ song, playing, playlist, index }: Props) => {
    // console.log("song rendered: ", song.id)
    const { id, title, thumbnail, artist, date } = song;
    const { controls: songControls } = useSongs();
    const { controls: musicControls } = useMusic();
    const { controls: playlistControls } = usePlaylists();
    const [blackAlpha600, green300] = useToken("colors", ["blackAlpha.600", "green.300"])
    const [hovered, setHovered] = useState(false);
    const playlists = usePlaylistsStore(state => state.playlists);

    const handlePlaySong = (e: any) => {
        e.stopPropagation();
        musicControls.setSong(id, true);
    };

    const handlePauseSong = (e: any) => {
        e.stopPropagation();
        musicControls.pause();
        // musicControls.setSong(id, true);
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
                                index + 1
                            )
                        ) : (
                            playing ? (
                                <IconButton aria-label={"pause"} size={"xs"} onClick={handlePauseSong}>
                                    <IconPlayerPauseFilled size={16} />
                                </IconButton>
                            ) : (
                                <IconButton aria-label={"play"} size={"xs"} onClick={handlePlaySong}>
                                    <IconPlayerPlayFilled size={16} />
                                </IconButton>
                            )
                        )
                    }
                </Center>
            </Td>
            <Td>
                <Stack direction={"row"} alignItems={"center"}>
                    <Image src={song.thumbnail} height={"3rem"} objectFit={"cover"} />
                    <Stack direction={"column"} justifyContent={"center"}>
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
                1:00
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
});