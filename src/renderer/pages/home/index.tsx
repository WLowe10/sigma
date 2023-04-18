import { useEffect, useState, useMemo } from "react";
import { Home as HomeIcon, Search, Book, Clock } from "react-feather";
import { useMusic } from "@renderer/services/music-player/hooks";
import { useSongs } from "@renderer/services/songs/hooks";
import { AnimatePresence } from "framer-motion";
import { Flex, Heading, Input, TableCaption, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Image, Stack, Box, InputGroup, InputLeftAddon, InputLeftElement } from "@chakra-ui/react";
import { Song } from "@renderer/components/song";
import { useSongsStore } from "@renderer/services/songs/store";
import { IconSearch } from "@tabler/icons-react";
import FuzzySearch from "fuzzy-search";

export const Home = () => {
    const [search, setSearch] = useState<string>("");
    const songs = useSongsStore(state => state.songs);
    const fuzzy = useMemo(() => new FuzzySearch(songs, ["title", "artist"]), [songs]);
    const results = fuzzy.search(search);

    const handleSearch = (e: any) => {
        setSearch(e.target.value);
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
                            value={search}
                        />
                    </InputGroup>
                </Box>
            </Stack>
            <TableContainer>
                <Table size={"sm"}>
                    <Thead>
                        <Tr>
                            <Th>
                                Title
                            </Th>
                            <Th>
                                Date
                            </Th>
                            <Th>
                                <Clock size={16}/>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            results && results.map(song => (
                                <Song song={{...song}} key={song.id} />
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
};