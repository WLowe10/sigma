import { Stack, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RouteTypes } from "@renderer/global/constants/routes";
import { Home, Download } from "react-feather";

export const SideBar = () => {
    return (
        <Stack direction={"column"} spacing={4} bg="gray.900" p={4}>
            <Box>
                <Link to={RouteTypes.Home}>
                    <Home color={"white"} />
                </Link>
            </Box>
            <Box>
                <Link to={RouteTypes.Download}>
                    <Download color={"white"} />
                </Link>
            </Box>
        </Stack>
    )
};