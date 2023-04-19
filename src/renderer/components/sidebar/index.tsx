import { Stack, Box, Text, Divider, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RouteTypes } from "@renderer/constants/routes";
import { Home, Download } from "react-feather";
import { useSongs } from "@renderer/services/songs/hooks";
import { IconPlus } from "@tabler/icons-react";
import { usePlaylistsStore } from "@renderer/services/playlists/store";

export const SideBar = () => {
    const { controls } = useSongs();
    const playlists = usePlaylistsStore(state => state.playlists);

    return (
        <Stack direction={"column"} spacing={4} bg="gray.900" p={"4"} pr={"10"} pt={"6"} justifyContent={"space-between"}>
            <Stack direction={"column"}>
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
                <Divider />
                {
                    playlists.map(pl => (
                    <Box key={pl.id}>
                        <Link to={`/playlist/${pl.id}`}>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Avatar name={"main"} size={"xs"} bg={"gray.600"} />
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
            <Box onClick={controls.openDownloader} _hover={{ cursor: "pointer" }} alignSelf={"flex-end"}>
                <Stack direction={"row"} spacing={"4"}>
                    <IconPlus color={"white"} style={{ cursor: "pointer" }} />
                    <Text color={"white"} fontWeight={"semibold"}>
                        Add Song
                    </Text>
                </Stack>
            </Box>
        </Stack>
    )
};