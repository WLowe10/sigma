import { useParams } from "react-router-dom";
import { Box, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Stack, useDisclosure } from "@chakra-ui/react";
import { usePlaylist } from "@renderer/services/playlists/hooks";
import { SongTable } from "@renderer/components";
import { useSongsStore } from "@renderer/services/songs/store";
import { useFuzzy } from "react-hook-fuzzy";
import { IconDotsVertical, IconPlus, IconSearch } from "@tabler/icons-react";
import { SongAddModal } from "./components";

export const Playlist = () => {
    const { id } = useParams();
    const playlist = usePlaylist(id!);
    const getSongs = useSongsStore(state => state.getSongs);
    const songs = useSongsStore(state => state.songs.filter(song => playlist && playlist.songs.includes(song.id)));
    const addDisclosure = useDisclosure();
    const { results, search, term } = useFuzzy(songs, ["title", "artist"]);

    const handleSearch = (e: any) => {
        search(e.target.value);
    };

    return (
        <>
         <Flex direction={"column"} flex={1}>
            <Stack direction={"row"} justifyContent={"space-between"} mb={2} p={4}>
                <Heading size={"lg"}>
                    {
                        playlist ? playlist.name : "Playlist not found"
                    }
                </Heading>
                <Stack direction={"row"} alignItems={"center"}>
                    <Menu>
                        <MenuButton onClick={(e: any) => e.stopPropagation()}>
                            <IconButton as={"div"} aria-label={"more options"} size={"sm"}>
                                <IconDotsVertical size={16}/>
                            </IconButton>
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={undefined}>
                                Delete 
                            </MenuItem>
                        </MenuList>
                    </Menu>

                    <IconButton aria-label={"add-song"} size={"sm"} onClick={addDisclosure.onOpen}>
                        <IconPlus size={16}/>
                    </IconButton>

                    <InputGroup>
                        <InputLeftElement>
                            <IconSearch size={14} />
                        </InputLeftElement>
                        <Input 
                            placeholder={"search"} 
                            onChange={handleSearch} 
                            value={term}
                        />
                    </InputGroup>
                </Stack>
            </Stack>
            <SongTable songs={results}/>
        </Flex>

        <SongAddModal open={addDisclosure.isOpen} onClose={addDisclosure.onClose} />
        </>
    )
};