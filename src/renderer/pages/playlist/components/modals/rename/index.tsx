import { useState } from "react";
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
    Input,
} from "@chakra-ui/react"

type Props = {
    open: boolean,
    onClose: () => any,
    initialName: string,
    controls: {
        rename: (name: string) => void,
    }
};

export const RenameModal = ({ open, onClose, initialName, controls }: Props) => {
    const [name, setName] = useState<string>(initialName);

    const handleRename = () => { 
        if (name.length < 1) return;

        controls.rename(name);
        onClose();
    };

    return (
        <Modal isOpen={open} isCentered={true} closeOnOverlayClick={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxHeight={"80vh"}>
                <ModalHeader>
                    Rename Playlist
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody overflowY={"auto"}>
                    <Input 
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                        placeholder={"Enter a new name"}
                    />
                </ModalBody>
                <ModalFooter>
                    <Center width={"100%"}>
                        <Button onClick={handleRename}>
                            Rename
                        </Button>
                    </Center>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}