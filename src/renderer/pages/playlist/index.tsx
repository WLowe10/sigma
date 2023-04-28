import { useParams, useNavigate } from "react-router-dom";
import { Box, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Stack, useDisclosure } from "@chakra-ui/react";
import { usePlaylist, usePlaylists } from "@renderer/services/playlists/hooks";
import { SongTable } from "@renderer/components";
import { useSongsStore } from "@renderer/services/songs/store";
import { useFuzzy } from "react-hook-fuzzy";
import { IconDotsVertical, IconPlus, IconSearch, IconSettings, IconTrashFilled } from "@tabler/icons-react";
import { SongAddModal } from "./components";
import { RouteTypes } from "@renderer/constants/routes";
import { IconTrash } from "@tabler/icons-react";

export const Playlist = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { controls: playlistControls } = usePlaylists();
    const playlist = usePlaylist(id);
    const songs = useSongsStore(state => state.songs.filter(song => playlist && playlist.songs.includes(song.id)));
    const { results, search, term } = useFuzzy(songs, ["title", "artist"]);
    const addDisclosure = useDisclosure();

    const handleSearch = (e: any) => {
        search(e.target.value);
    };

    const handleDeletePlaylist = () => {
        if (!id) return;

        playlistControls.delete(id);
        navigate(RouteTypes.Home);
    };

    if (!id) return null;

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
                    <IconButton aria-label={"add-song"} size={"sm"} onClick={addDisclosure.onOpen}>
                        <IconPlus size={16}/>
                    </IconButton>

                    <Menu>
                        <MenuButton onClick={(e: any) => e.stopPropagation()}>
                            <IconButton as={"div"} aria-label={"more options"} size={"sm"}>
                                <IconSettings size={16}/>
                            </IconButton>
                        </MenuButton>
                        <MenuList>
                            <MenuItem icon={<IconTrash size={16} />} onClick={handleDeletePlaylist}>
                                Delete 
                            </MenuItem>
                        </MenuList>
                    </Menu>

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
            <SongTable songs={results} playlistId={id}/>
        </Flex>

        <SongAddModal playlistId={id} open={addDisclosure.isOpen} onClose={addDisclosure.onClose} />
        </>
    )
};