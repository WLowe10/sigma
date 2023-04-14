import { Stack, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RouteTypes } from "@renderer/constants/routes";
import { Home, Download } from "react-feather";
import { useSongs } from "@renderer/services/songs/hooks";

export const SideBar = () => {
    const { controls } = useSongs();

    return (
        <Stack direction={"column"} spacing={4} bg="gray.900" p={4}>
            <Box>
                <Link to={RouteTypes.Home}>
                    <Home color={"white"} />
                </Link>
            </Box>
            <Box onClick={controls.openDownloader}>
                <Download color={"white"} style={{ cursor: "pointer" }} />
            </Box>
        </Stack>
    )
};