import { useMusic } from "@renderer/services/music-player/hooks";
import { useEffect, useState } from "react";
import { useAudioDuration } from "@renderer/hooks";
import { motion } from "framer-motion"  
import { Button, Card, Text, Image, CardHeader, CardBody, Stack, Tr, Td, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { IconDotsVertical } from "@tabler/icons-react";
import type { SongType } from "@global/types";
import { useSongs } from "@renderer/services/songs/hooks";

type Props = {
    song: SongType
};

export const Song = ({ song }: Props) => {
    const { id, title, thumbnail, artist, date } = song;
    const { controls: songControls } = useSongs();
    const { controls: musicControls } = useMusic();

    const handleSelectSong = () => {
        musicControls.setSong(id);
    };

    const handleDeleteSong = () => {
        songControls.deleteSongs([id]);
    };

    return (
        <Tr onClick={handleSelectSong}>
            <Td>
                <Stack direction={"row"}>
                    <Image src={song.thumbnail} height={"3rem"} objectFit={"cover"}/>
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
                    <MenuButton>
                        <IconDotsVertical />
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={handleDeleteSong}>
                            Remove
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Td>
        </Tr> 
    )
};