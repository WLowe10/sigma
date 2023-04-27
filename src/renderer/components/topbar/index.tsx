import { Draggable } from "../draggable"
import { Minimize, Maximize, XSquare } from "react-feather";
import { Undraggable } from "../undraggable";
import { Box, IconButton, Stack, Text } from "@chakra-ui/react";

export const TopBar = () => {
    return (
        <Box p={2} bg={"blackAlpha.500"}>
            <Draggable>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontWeight={"bold"}>
                        Σ
                    </Text>
                    <Undraggable>
                        <Stack direction={"row"}>
                            <IconButton aria-label={"minimize"} size={"xs"}>
                                <Minimize size={14} />
                            </IconButton>
                            <IconButton aria-label={"maximize"} size={"xs"}>
                                <Maximize size={14} />
                            </IconButton>
                            <IconButton aria-label={"exit"} size={"xs"}>
                                <XSquare size={14} />
                            </IconButton>
                        </Stack>
                    </Undraggable> 
                </Stack>
            </Draggable>
        </Box>
    )
}