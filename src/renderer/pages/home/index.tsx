import { useEffect, useState } from "react";
import { Home as HomeIcon, Search, Book } from "react-feather";
import { useMusic } from "@renderer/services/music-player/hooks";
import { useSongs } from "@renderer/services/songs/hooks";
import { AnimatePresence } from "framer-motion";
import { Flex, Heading } from "@chakra-ui/react";
import { Song } from "@renderer/components/song";

export const Home = () => {
    const { songs } = useSongs();
    const [search, setSearch] = useState<string | null>(null);

    useEffect(() => {

    }, [search])

    return (
        <Flex p={5} direction={"column"}>
            <Heading size={"lg"} mb={5}>
                Recently Played
            </Heading>
            <Flex direction={"row"} gap={"1rem"}>
                <Song song={{id: "1", title: "boom", artist: "test", url: "dad", date: "awd"}}/> 
                <Song song={{id: "1", title: "boom", artist: "test", url: "dad", date: "awd"}}/> 
            </Flex>
        </Flex>
    )
};