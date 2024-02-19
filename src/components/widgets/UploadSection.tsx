"use client";

import React, { useCallback, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { UploadIcon } from "@radix-ui/react-icons"; 
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/db/uploadthing/uploadthing";
import { Card } from "@nextui-org/card";
import { Spinner } from "@nextui-org/react";
import { Progress } from "@nextui-org/progress";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function UploadModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} variant="shadow">
        <span>Upload File</span>
        <UploadIcon></UploadIcon>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="p-3">
          {(onClose) => (
            <>
              <ModalBody className="pt-10">
                <FileUploader></FileUploader>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function FileUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);
  const router = useRouter();

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing("fileUploader", {
    onUploadProgress: (value) => {
      if(value !== 100) {
        setProgress(value)
      }
    },
    onClientUploadComplete: (e) => {
      setFiles([]);
      setProgress(100);
      toast.success("uploaded successfully");
      router.refresh();
    },
    onUploadError: (e) => {
      toast.error(e.message);
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div>
      <Card>
        <div
          {...getRootProps()}
          className="h-24 w-full p-4 flex justify-center items-center cursor-pointer"
        >
          {/* @ts-ignore */}
          <input className="border w-full" {...getInputProps()} type="file" />
          <span className="mx-auto text-gray-300 font-semibold">
            Drop files here!
          </span>
        </div>
      </Card>
      <div className="flex flex-col mt-3 space-y-3 w-full justify-center items-center">
        {!(progress === 0 || progress === 100) ? (
          <Progress
            aria-label="Uploading..."
            size="md"
            value={progress}
            color="default"
            className="max-w-md"
          />
        ) : null}
        <Button
          onClick={() => startUpload(files!)}
          className="gap-2"
          isDisabled={isUploading || files.length === 0}
        >
          <span>
            {files.length > 0
              ? isUploading
                ? "Uploading..."
                : `Upload ${files.length} files`
              : "Upload"}
          </span>
          {isUploading && <Spinner size="sm" color="white"></Spinner>}
        </Button>
      </div>
    </div>
  );
}

export { UploadModal };
