import React, { FC } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { TrashIcon } from "@radix-ui/react-icons";

interface DeleteModalProps {
  onDelete: (data: any) => Promise<void>;
  data: any;
  children: React.ReactNode;
  variant?: "flat" | "shadow" | "solid" | "light";
}

const DeleteModal = ({
  children,
  onDelete,
  data,
  variant = "light",
}: DeleteModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip color="danger" content="Delete">
        <Button isIconOnly color="danger" variant={variant} onPress={onOpen}>
          <TrashIcon className="h-6 w-6" />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent className="pt-2">
          {(onClose) => (
            <>
              <ModalHeader>{children}</ModalHeader>
              <ModalFooter className="flex justify-center">
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    onDelete(data);
                    onClose();
                  }}
                >
                  Delete
                </Button>
                <Button onPress={onClose} variant="flat">Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
