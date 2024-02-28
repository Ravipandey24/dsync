"use client";

import { deleteFile } from "@/db";
import { FileDataType } from "@/db/types";
import { Button } from "@nextui-org/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import { toast } from "sonner";
import DeleteModal from "../ui/modal";

interface DeleteButtonProps {
  username: string;
  fileData: FileDataType;
}

const DeleteButton: FC<DeleteButtonProps> = ({ username, fileData }) => {
  const handleClick = async () => {
    const { success } = await deleteFile(username, fileData);
    if (success) {
      toast.success("File deleted");
    } else {
      toast.error("something went wrong!");
    }
  };

  return (
    <DeleteModal
      onDelete={handleClick}
      data={{ username, fileData }}
    >
      <span>Do you wish to Delete &apos;{fileData.fileName}&apos;?</span>
    </DeleteModal>
  );
};

export default DeleteButton;
