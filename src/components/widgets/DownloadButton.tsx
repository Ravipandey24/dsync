'use client'

import { FC } from "react";
import { saveAs } from "file-saver";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";

interface DownloadButtonProps {
  fileUrl: string | null;
  fileName: string;
}

const DownloadButton: FC<DownloadButtonProps> = ({ fileUrl, fileName }) => {
  const handleclick = () => {
    if(fileUrl === null) {
      toast.error("File not found");
      return;
    };
    saveAs(fileUrl, fileName);
  };
  return (
    <Button
      onClick={handleclick}
      className="w-full h-12 text-base"
      variant="flat"
      radius="lg"
      size="sm"
    >
      Download
    </Button>
  );
};

export default DownloadButton;
