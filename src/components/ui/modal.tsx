import React, { FC } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { TrashIcon } from "@radix-ui/react-icons";
import { RegisterDataType, UserDataType } from "@/db/types";

interface DeleteModalProps {
  onDelete: (data: any) => Promise<void>;
  data: any;
  children: React.ReactNode;
}

const DeleteModal = React.forwardRef<HTMLButtonElement, DeleteModalProps>(
  ({ children, onDelete, data }, ref) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
      <>
        <Tooltip color="danger" content="Delete">
          <Button isIconOnly color="danger" variant="shadow" onPress={onOpen}>
            <TrashIcon className="h-6 w-6" />
          </Button>
        </Tooltip>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className="pt-2">
            {(onClose) => (
              <>
                <ModalHeader className="flex jus">{children}</ModalHeader>
                <ModalFooter className="flex justify-center">
                  <Button
                    color="danger"
                    variant="solid"
                    onPress={() => onDelete(data)}
                  >
                    Delete
                  </Button>
                  <Button onPress={onClose}>Close</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
);
export default DeleteModal;
