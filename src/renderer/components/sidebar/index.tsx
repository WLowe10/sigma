import { Stack, Box, Text, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RouteTypes } from "@renderer/constants/routes";
import { Home, Download } from "react-feather";
import { useSongs } from "@renderer/services/songs/hooks";
import { IconPlus } from "@tabler/icons-react";

export const SideBar = () => {
    const { controls } = useSongs();

    return (
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
            <Box onClick={controls.openDownloader} _hover={{ cursor: "pointer" }}>
                <Stack direction={"row"} spacing={"4"}>
                    <IconPlus color={"white"} style={{ cursor: "pointer" }} />
                    <Text color={"white"} fontWeight={"semibold"}>
                        Add Song
                    </Text>
                </Stack>
            </Box>
            <Divider />
        </Stack>
    )
};