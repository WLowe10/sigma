import { Draggable } from "../draggable"
import { Minimize, Maximize, XSquare } from "react-feather";
import { Undraggable } from "../undraggable";
import { Box, IconButton, Stack, Text } from "@chakra-ui/react";
import { useVersion } from "@renderer/hooks";

export const TopBar = () => {
    const version = useVersion();

    const handleMinimize = () => {
        window.electron.appService.minimize()
    };

    const handleMaximize = () => {
        window.electron.appService.maximize()
    };

    const handleExit = () => {
        window.electron.appService.exit()
    };

    return (
        <Box p={2} bg={"blackAlpha.500"}>
            <Draggable>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Text fontWeight={"bold"}>
                            Sigma 
                        </Text>
                        {
                            version && (
                                <Text fontSize={"sm"} color={"gray.600"}>
                                    {
                                        "v" + version
                                    }
                                </Text>
                            )
                        }
                    </Stack>
                    <Undraggable>
                        <Stack direction={"row"}>
                            <IconButton aria-label={"minimize"} size={"xs"} onClick={handleMinimize}>
                                <Minimize size={14} />
                            </IconButton>
                            <IconButton aria-label={"maximize"} size={"xs"} onClick={handleMaximize}>
                                <Maximize size={14} />
                            </IconButton>
                            <IconButton aria-label={"exit"} size={"xs"} onClick={handleExit}>
                                <XSquare size={14} />
                            </IconButton>
                        </Stack>
                    </Undraggable> 
                </Stack>
            </Draggable>
        </Box>
    )
}