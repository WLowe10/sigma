import { Stack, Box, Text, Divider, Avatar, useDisclosure, Card, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RouteTypes } from "@renderer/constants/routes";
import { useSongs } from "@renderer/services/songs/hooks";
import { IconCards, IconHome, IconMusic, IconPlus } from "@tabler/icons-react";
import { usePlaylistsStore } from "@renderer/services/playlists/store";
import { PlaylistAddModal, SongDownloadModal } from "../modals";

export const SideBar = () => {
    const { controls } = useSongs();
    const downloadDisclosure = useDisclosure();
    const playlistDisclosure = useDisclosure();
    const playlists = usePlaylistsStore(state => state.playlists);

    return (
        <>
        <Stack direction={"column"} minWidth={"14rem"} spacing={4} bg="gray.900" p={"4"} pr={"10"} pt={"6"}>
            <Box>
                <Link to={RouteTypes.Home}>
                    <Stack direction={"row"} spacing={"4"}>
                        <IconButton aria-label={"home"} size={"xs"}>
                            <IconHome size={16} />
                        </IconButton>
                        <Text color={"white"} fontWeight={"semibold"}>
                            Home
                        </Text>
                    </Stack>
                </Link>
            </Box>
            <Box onClick={downloadDisclosure.onOpen} _hover={{ cursor: "pointer" }}>
                <Stack direction={"row"} spacing={"4"}>
                    <IconButton aria-label={"add-song"} size={"xs"}>
                        <IconMusic color={"white"} size={16}/>
                    </IconButton>
                    <Text color={"white"} fontWeight={"semibold"}>
                        Add Song
                    </Text>
                </Stack>
            </Box>
            <Box onClick={playlistDisclosure.onOpen} _hover={{cursor: "pointer"}}>
                <Stack direction={"row"} spacing={"4"}>
                    <IconButton aria-label={"create-playlist"} size={"xs"}>
                        <IconCards color={"white"} size={16} />
                    </IconButton>
                    <Text color={"white"} fontWeight={"semibold"}>
                        Create Playlist
                    </Text>
                </Stack>
            </Box>
            <Divider />
            <Stack spacing={4} overflowY={"auto"}>
            {
                playlists.map(pl => (
                    <Box key={pl.id}>
                        <Link to={`/playlist/${pl.id}`}>
                            <Stack direction={"row"} alignItems={"center"}>
                                <IconButton aria-label={"open-playlist"} size={"xs"}>
                                    <Avatar name={pl.name} size={"xs"} color={"white"} bg={"transparent"} borderRadius={2} />
                                </IconButton>
                                <Text color={"white"} fontWeight={"semibold"}>
                                    {
                                        pl.name
                                    }
                                </Text>
                            </Stack>
                        </Link>
                    </Box>
                ))
            }
            </Stack>
        </Stack>

        <SongDownloadModal open={downloadDisclosure.isOpen} onClose={downloadDisclosure.onClose}/>
        <PlaylistAddModal open={playlistDisclosure.isOpen} onClose={playlistDisclosure.onClose}/>
        </>
    )
};