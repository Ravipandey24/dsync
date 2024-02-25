import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { FC } from "react";
import DeleteButton from "@/components/widgets/DeleteButton";
import DownloadButton from "../widgets/DownloadButton";

interface FileCardProps {
  fileName: string;
  fileUrl: string | null;
  fileKey: string;
  username: string;
}

const FileCard: FC<FileCardProps> = ({
  fileName,
  fileKey,
  fileUrl,
  username,
}) => {
  return (
    <Card className="w-full h-56" isBlurred>
      <CardBody>
        <div className="flex justify-between">
          <span className="text-lg">{fileName}</span>
          <DeleteButton
            fileName={fileName}
            username={username}
            fileKey={fileKey}
          ></DeleteButton>
        </div>
      </CardBody>
      <CardFooter className="w-[calc(100%_-_8px)] shadow-small ml-1">
        <DownloadButton fileName={fileName} fileUrl={fileUrl}></DownloadButton>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
