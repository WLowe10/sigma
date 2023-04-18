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
import { useSongs } from "../../hooks";

type Props = {
    open: boolean
};

export const SongDownloadModal = ({ open }: Props) => {
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
        <Modal isOpen={open} isCentered={true} closeOnOverlayClick={true} onClose={() => {songsControls.closeDownloader()}}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Add Song 
                    <ModalCloseButton />
                </ModalHeader>

                <ModalBody>
                    <FormControl>
                        <FormLabel>
                            Youtube URL
                        </FormLabel>
                        <Input {...register("url", {
                            required: "URL is required"
                        })}/>
                        <FormErrorMessage>
                            oops
                        </FormErrorMessage>
                    </FormControl>

                </ModalBody>
                <ModalFooter>
                    <Center width={"100%"}>
                        <Button onClick={handleDownload} isLoading={songsState.downloading}>
                            Download
                        </Button>
                    </Center>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}