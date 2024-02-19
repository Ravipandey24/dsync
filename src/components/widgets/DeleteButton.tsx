'use client'

import { deleteFile } from "@/db";
import { Button } from "@nextui-org/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import { toast } from "sonner";


interface DeleteButtonProps {
  fileKey: string;
  fileName: string;
  username: string;
}

const DeleteButton: FC<DeleteButtonProps> = ({ fileKey, fileName, username }) => {
  const handleClick = async () => {
    const { success } = await deleteFile(username, fileName, fileKey);
    if (success) {
      toast.success("File deleted");
    } else {
      toast.error("something went wrong!");
    }
  };

  return (
    <Button onClick={handleClick} variant="shadow" isIconOnly color="danger">
      <TrashIcon className="h-5 w-5"></TrashIcon>
    </Button>
  );
};

export default DeleteButton;
