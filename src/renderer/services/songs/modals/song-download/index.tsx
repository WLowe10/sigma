import { 
    Modal,
    ModalOverlay,
    ModalContent, 
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading,
    FormControl, 
    FormLabel,
    Input,
    Button,
    Center
} from "@chakra-ui/react"

type Props = {
    open: boolean
};

export const SongDownloadModal = ({ open }: Props) => {
    return (
        <Modal isOpen={true} isCentered={true} onClose={() => {}}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Song Download
                    <ModalCloseButton />
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
                        <Button>
                            Download
                        </Button>
                    </Center>
                </ModalFooter>

            </ModalContent>
        </Modal>
    )
}