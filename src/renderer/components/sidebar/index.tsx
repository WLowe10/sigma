import { Stack, Box, Text, Divider, Avatar, useDisclosure, Card } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RouteTypes } from "@renderer/constants/routes";
import { Home, Download, Plus } from "react-feather";
import { useSongs } from "@renderer/services/songs/hooks";
import { IconPlus } from "@tabler/icons-react";
import { usePlaylistsStore } from "@renderer/services/playlists/store";
import { PlaylistAddModal, SongDownloadModal } from "../modals";

export const SideBar = () => {
    const { controls } = useSongs();
    const downloadDisclosure = useDisclosure();
    const playlistDisclosure = useDisclosure();
    const playlists = usePlaylistsStore(state => state.playlists);

    return (
        <>
        <Stack direction={"column"} spacing={4} bg="gray.900" p={"4"} pr={"10"} pt={"6"}>
            <Box>
                <Link to={RouteTypes.Home}>
                    <Stack direction={"row"} spacing={"4"}>
                        <Home color={"white"} />
                        <Text color={"white"} fontWeight={"semibold"}>
                            Home
                        </Text>
                    </Stack>
                </Link>
            </Box>
            <Box onClick={downloadDisclosure.onOpen} _hover={{ cursor: "pointer" }}>
                <Stack direction={"row"} spacing={"4"}>
                    <Card bg={"gray.600"}>
                        <Plus color={"white"} />
                    </Card>
                    <Text color={"white"} fontWeight={"semibold"}>
                        Add Song
                    </Text>
                </Stack>
            </Box>
            <Box onClick={playlistDisclosure.onOpen} _hover={{cursor: "pointer"}}>
                <Stack direction={"row"} spacing={"4"}>
                    <Card bg={"gray.600"}>
                        <Plus color={"white"} />
                    </Card>
                    <Text color={"white"} fontWeight={"semibold"}>
                        Create Playlist
                    </Text>
                </Stack>
            </Box>
            <Divider />
            {
                playlists.map(pl => (
                    <Box key={pl.id}>
                        <Link to={`/playlist/${pl.id}`}>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Avatar name={pl.name} size={"xs"} bg={"gray.600"} />
                                <Text color={"white"} fontWeight={"bold"}>
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

        <SongDownloadModal open={downloadDisclosure.isOpen} onClose={downloadDisclosure.onClose}/>
        <PlaylistAddModal open={playlistDisclosure.isOpen} onClose={playlistDisclosure.onClose}/>
        </>
    )
};