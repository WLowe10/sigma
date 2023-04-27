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
} from "@chakra-ui/react"

type Props = {
    open: boolean,
    onClose: () => any
};

export const SongAddModal = ({ open, onClose }: Props) => {
    return (
        <Modal isOpen={open} isCentered={true} closeOnOverlayClick={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Add Songs
                    <ModalCloseButton />
                </ModalHeader>

                <ModalBody>

                </ModalBody>
                <ModalFooter>
                    <Center width={"100%"}>
                        <Button onClick={undefined}>
                            Add
                        </Button>
                    </Center>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}