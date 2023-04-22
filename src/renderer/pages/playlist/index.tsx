import { useParams } from "react-router-dom";
import { Box, Flex, Heading, Input, InputGroup, InputLeftElement, Stack, Text } from "@chakra-ui/react";
import { usePlaylist } from "@renderer/services/playlists/hooks";
import { SongTable } from "@renderer/components";
import { useSongsStore } from "@renderer/services/songs/store";
import { useFuzzy } from "react-hook-fuzzy";
import { IconSearch } from "@tabler/icons-react";

export const Playlist = () => {
    const { id } = useParams();
    const playlist = usePlaylist(id!);
    const getSongs = useSongsStore(state => state.getSongs);
    const songs = useSongsStore(state => state.songs.filter(song => playlist && playlist.songs.includes(song.id)));
    const { results, search, term } = useFuzzy(songs, ["title", "artist"]);

    const handleSearch = (e: any) => {
        search(e.target.value);
    };

    return (
         <Flex p={5} direction={"column"} flex={1}>
            <Stack direction={"row"} justifyContent={"space-between"} mb={"6"}>
                <Heading size={"lg"}>
                    {
                        playlist ? playlist.name : "Playlist not found"
                    }
                </Heading>
                <Box>
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
                </Box>
            </Stack>
            <SongTable songs={results}/>
        </Flex>
    )
};