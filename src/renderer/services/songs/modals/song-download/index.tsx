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
    Center
} from "@chakra-ui/react"
import { useSongs } from "../../hooks";

type Props = {
    open: boolean
};

export const SongDownloadModal = ({ open }: Props) => {
    const { controls } = useSongs();

    const handleDownload = () => {
        controls.downloadSong("dwdaw");
    };

    return (
        <Modal isOpen={open} isCentered={true} onClose={() => {}}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Song Download
                    <ModalCloseButton onClick={controls.closeDownloader}/>
                </ModalHeader>

                <ModalBody>
                    <FormControl>
                        <FormLabel>
                            Youtube URL
                        </FormLabel>
                        <Input/>
                    </FormControl>

                </ModalBody>
                <ModalFooter>
                    <Center width={"100%"}>
                        <Button onClick={handleDownload}>
                            Download
                        </Button>
                    </Center>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}