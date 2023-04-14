import { useEffect, useState } from "react";
import { Home as HomeIcon, Search, Book } from "react-feather";
import { useMusic } from "@renderer/services/music-player/hooks";
import { useSongs } from "@renderer/services/songs/hooks";
import { AnimatePresence } from "framer-motion";
import { Flex, Heading } from "@chakra-ui/react";

export const Home = () => {
    const { songs } = useSongs();
    const [search, setSearch] = useState<string | null>(null);

    useEffect(() => {

    }, [search])

    return (
        <Flex>
            <Heading>
                Home
            </Heading>
        </Flex>
    )
};