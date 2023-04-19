import { useEffect, useState, useMemo } from "react";
import { Home as HomeIcon, Search, Book, Clock } from "react-feather";
import { useMusic } from "@renderer/services/music-player/hooks";
import { useSongs } from "@renderer/services/songs/hooks";
import { AnimatePresence } from "framer-motion";
import { Flex, Heading, Input, TableCaption, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Image, Stack, Box, InputGroup, InputLeftAddon, InputLeftElement, Center } from "@chakra-ui/react";
import { Song } from "@renderer/components/song";
import { useSongsStore } from "@renderer/services/songs/store";
import { IconSearch } from "@tabler/icons-react";
import { SongTable } from "@renderer/components";
import { useFuzzy } from "@renderer/hooks";

export const Home = () => {
    const [searchQuery, setSearch] = useState<string>("");
    const songs = useSongsStore(state => state.songs);
    const { results, search } = useFuzzy(songs, ["title", "artist"]);

    const handleSearch = (e: any) => {
        setSearch(e.target.value);
        search(e.target.value);
    };

    return (
        <Flex p={5} direction={"column"} flex={1}>
            <Stack direction={"row"} justifyContent={"space-between"} mb={"6"}>
                <Heading size={"lg"}>
                    Recently Played
                </Heading>
                <Box>
                    <InputGroup>
                        <InputLeftElement>
                            <IconSearch size={14} />
                        </InputLeftElement>
                        <Input 
                            placeholder={"search"} 
                            onChange={handleSearch} 
                            value={searchQuery}
                        />
                    </InputGroup>
                </Box>
            </Stack>
            <SongTable songs={results}/>
        </Flex>
    )
};