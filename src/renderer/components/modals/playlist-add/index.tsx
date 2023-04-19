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

    const { state: songsState, controls: songsControls } = useSongs();

    const handleDownload = handleSubmit((data) => {
        songsControls.addSong(data.url);
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
                        <Button onClick={handleDownload} isLoading={songsState.downloading}>
                            Create
                        </Button>
                    </Center>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}