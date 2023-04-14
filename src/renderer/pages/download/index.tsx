import { useRef, useState } from "react";
// import { useStyles } from "./styles";
import { useSongs } from "@renderer/services/songs/hooks";
import { Flex } from "@chakra-ui/react";

export const Download = () => {
    const { controls } = useSongs();
    const [urlValue, setUrlValue] = useState("");

    const downloadHandler = async () => {   
        // const song = await controls.downloadSong(urlValue);
        // toast.success(`Downloaded Song: ${song.title}`)
    };

    return (
        <Flex>

        </Flex>
    )
};