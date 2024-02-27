import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { FC } from "react";
import DeleteButton from "@/components/widgets/DeleteButton";
import DownloadButton from "../widgets/DownloadButton";
import { Link } from "@nextui-org/link";
import { formatByteData } from "@/lib/utils";

interface FileCardProps {
  fileName: string;
  fileUrl: string | null;
  fileKey: string;
  fileSize: number;
  username: string;
}

const FileCard: FC<FileCardProps> = ({
  fileName,
  fileKey,
  fileUrl,
  fileSize,
  username,
}) => {
  return (
    <Card className="w-full h-56" isBlurred>
      <CardBody>
        <div className="flex justify-between">
          <span>{formatByteData(fileSize)}</span>
          <DeleteButton
            username={username}
            fileData={{ fileKey, fileName, fileSize }}
          ></DeleteButton>
        </div>
        <div className="flex h-full items-center justify-center">
          <Link isExternal href={fileUrl!} className="text-lg">{fileName}</Link>
        </div>
      </CardBody>
      <CardFooter className="w-[calc(100%_-_8px)] shadow-small ml-1">
        <DownloadButton fileName={fileName} fileUrl={fileUrl}></DownloadButton>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
