import { useParams } from "react-router-dom";
import { Box, Flex, Heading, Input, InputGroup, InputLeftElement, Stack, Text } from "@chakra-ui/react";
import { usePlaylist } from "@renderer/services/playlists/hooks";
import { SongTable } from "@renderer/components";
import { useSongs } from "@renderer/services/songs/hooks";
import { useSongsStore } from "@renderer/services/songs/store";
import { useMemo } from "react";
import { useFuzzy } from "react-hook-fuzzy";
import { IconSearch } from "@tabler/icons-react";

export const Playlist = () => {
    const { id } = useParams();
    const playlist = usePlaylist(id!);

    if (!playlist) return null;

    const getSongs = useSongsStore(state => state.getSongs);
    const songs = useSongsStore(state => state.songs.filter(song => playlist.songs.includes(song.id)));
    const { results, search, term } = useFuzzy(songs, ["title", "artist"]);

    const handleSearch = (e: any) => {
        search(e.target.value);
    };

    return (
         <Flex p={5} direction={"column"} flex={1}>
            <Stack direction={"row"} justifyContent={"space-between"} mb={"6"}>
                <Heading size={"lg"}>
                    {
                        playlist.name
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