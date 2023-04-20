import { 
    Modal,
    ModalOverlay,
    ModalContent, 
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl, 
    FormLabel,
    Input,
    Button,
    Center,
    FormErrorMessage
} from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import { useSongs } from "@renderer/services/songs/hooks";
import { usePlaylists } from "@renderer/services/playlists/hooks";

type Props = {
    open: boolean,
    onClose: () => any
};

export const PlaylistAddModal = ({ open, onClose }: Props) => {
    const {
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { controls: playlistControls } = usePlaylists();

    const handleCreate = handleSubmit((data) => {
        playlistControls.create(data.name);
    });

    return (
        <Modal isOpen={open} isCentered={true} closeOnOverlayClick={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Create Playlist
                    <ModalCloseButton />
                </ModalHeader>

                <ModalBody>
                    <FormControl>
                        <FormLabel>
                            What would you like it to be called?
                        </FormLabel>
                        <Input 
                            placeholder={"name"}
                            {...register("name", {
                                required: "a name is required"
                            })}
                        />
                        <FormErrorMessage>

                        </FormErrorMessage>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Center width={"100%"}>
                        <Button onClick={handleCreate}>
                            Create
                        </Button>
                    </Center>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}