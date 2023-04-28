import { 
    Modal,
    ModalOverlay,
    ModalContent, 
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Center,
    Text,
    Card,
    Box,
    Image,
    Checkbox,
    Stack,
    Heading,
    Input,
    StackDivider,
    Divider,
} from "@chakra-ui/react"
import { usePlaylists } from "@renderer/services/playlists/hooks";
import { useSongsStore } from "@renderer/services/songs/store";
import { useState } from "react";
import { useFuzzy } from "react-hook-fuzzy";

type Props = {
    open: boolean,
    onClose: () => any,
    playlistId: string
};

export const SongAddModal = ({ open, onClose, playlistId }: Props) => {
    const songs = useSongsStore(state => state.songs);
    const { controls: playlistControls } = usePlaylists();
    const [selected, setSelected] = useState<Array<string>>([]);
    const { results, term, search } = useFuzzy(songs, ["title", "artist"]);

    const handleSearch = (e: any) => {
        search(e.target.value);
    };

    const handleSelect = (songId: string, checked: boolean) => {
        if (checked) {
            setSelected(prev => [...prev, songId]);
        } else {
            const filtered = selected.filter(id => id !== songId);
            setSelected(prev => filtered);
        };
    };

    const handleAdd = () => {
        if (selected.length < 1) return;

        playlistControls.addSongs(playlistId, selected);
        setSelected([]);
    };

    return (
        <Modal isOpen={open} isCentered={true} closeOnOverlayClick={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxHeight={"80vh"}>
                <ModalHeader>
                    <Heading fontSize={"xl"}>
                        Add Songs
                    </Heading>
                    <Input 
                        placeholder={"search"} 
                        size={"sm"} 
                        mb={2} 
                        mt={2} 
                        borderRadius={4}
                        value={term}
                        onChange={handleSearch}
                    />
                    <ModalCloseButton />
                    <Divider />
                </ModalHeader>
                <ModalBody overflowY={"auto"}>
                    <Stack direction={"column"} spacing={4} divider={<StackDivider />}>
                    {
                        results.map((song) => (
                            <Stack direction={"row"} key={song.id}>
                                <Checkbox 
                                    size={"lg"}
                                    isChecked={selected.includes(song.id)}
                                    onChange={(e: any) => handleSelect(song.id, e.target.checked)}
                                />
                                <Image src={song.thumbnail} height={"16"} width={"16"} objectFit={"cover"}/>
                                <Stack direction={"column"}>
                                    <Text>
                                        {
                                            song.title
                                        }
                                    </Text>
                                    <Text color={"gray.500"}>
                                        {
                                            song.artist
                                        }
                                    </Text>
                                </Stack>
                            </Stack>
                        ))
                    }
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Center width={"100%"}>
                        <Button onClick={handleAdd} isDisabled={!selected.length}>
                            Add ({ selected.length })
                        </Button>
                    </Center>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}