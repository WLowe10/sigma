import { useMusic } from "@renderer/services/music-player/hooks";
import { useEffect, useState } from "react";
import { useAudioDuration } from "@renderer/hooks";
import { Button, Card, Text, Image, CardHeader, CardBody, Stack, Tr, Td, Menu, MenuButton, MenuList, MenuItem, Center, chakra, useTheme, IconButton } from "@chakra-ui/react";
import { IconDotsVertical, IconPlayerPlayFilled } from "@tabler/icons-react";
import { useSongs } from "@renderer/services/songs/hooks";
import { motion } from "framer-motion"  
import { useToken } from "@chakra-ui/react";
import type { SongType } from "@global/types";

type Props = {
    song: SongType,
    index: number
};

export const Song = ({ song, index }: Props) => {
    const { id, title, thumbnail, artist, date } = song;
    const { controls: songControls } = useSongs();
    const { controls: musicControls } = useMusic();
    const [blackAlpha600] = useToken("colors", ["blackAlpha.600"])
    const [hovered, setHovered] = useState(false);

    const handleSelectSong = () => {
        musicControls.setSong(id);
    };

    const handleDeleteSong = () => {
        songControls.deleteSongs([id]);
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
                            index + 1
                        ) : (
                            <IconButton aria-label={"play"} size={"xs"}>
                                <IconPlayerPlayFilled size={16} />
                            </IconButton>
                        )
                    }
                </Center>
            </Td>
            <Td>
                <Stack direction={"row"} alignItems={"center"}>
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
                    <MenuButton onClick={(e: any) => e.stopPropagation()}>
                        <IconDotsVertical size={16}/>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            Add to playlist
                        </MenuItem>
                        <MenuItem onClick={handleDeleteSong}>
                            Remove
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Td>
        </Tr> 
    )
};