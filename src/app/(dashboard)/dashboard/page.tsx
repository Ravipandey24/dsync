import UploadModal from "@/components/widgets/UploadSection";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { UserButton, currentUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Meteors } from "@/components/ui/meteors";
import { getAllUserFiles } from "@/db";
import DownloadButton from "@/components/widgets/DownloadButton";
import DeleteButton from "@/components/widgets/DeleteButton";
import ErrorCard from "@/components/widgets/ErrorCard";
import { GridBackground } from "@/components/widgets/GridDotBackground";

export default async function Home() {
  const user = await currentUser();
  const userFiles = await getAllUserFiles(user?.username!);

  return (
    <GridBackground>
      <div className="container z-10 mx-auto px-4 mt-14 space-y-3 py-6">
        <Card className="w-full">
          <CardBody
            as="div"
            className="flex flex-row justify-between items-center"
          >
            <span className="text-lg ">Dashboard</span>
            <UploadModal></UploadModal>
          </CardBody>
        </Card>
        {userFiles.length ? (
          <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {userFiles.map(({ fileName, fileUrl, fileKey }, i) => (
              <Card key={i} className="w-full h-56" isBlurred>
                <CardBody>
                  <div className="flex justify-between">
                    <span className="text-lg">{fileName}</span>
                    <DeleteButton
                      fileName={fileName}
                      username={user?.username!}
                      fileKey={fileKey}
                    ></DeleteButton>
                  </div>
                </CardBody>
                <CardFooter className="w-[calc(100%_-_8px)] shadow-small ml-1">
                  <DownloadButton
                    fileName={fileName}
                    fileUrl={fileUrl}
                  ></DownloadButton>
                </CardFooter>
                <Meteors number={20} />
              </Card>
            ))}
          </div>
        ) : (
          <ErrorCard
            className="w-72 mx-auto"
            heading="No files"
            description="You haven't uploaded any files yet!"
          ></ErrorCard>
        )}
      </div>
      {/* <BackgroundBeams /> */}
    </GridBackground>

    // <div className="container mx-auto py-6">
    //   <Card className="w-full">
    //     <CardBody
    //       as="div"
    //       className="flex flex-row justify-between items-center"
    //     >
    //       <span className="text-lg ">Dashboard</span>
    //       <UploadModal></UploadModal>
    //     </CardBody>
    //   </Card>
    //   <BackgroundBeams />
    // </div>
  );
}
