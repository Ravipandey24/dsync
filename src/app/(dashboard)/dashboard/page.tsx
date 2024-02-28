import UploadModal from "@/components/widgets/UploadSection";
import { currentUser } from "@clerk/nextjs";
import { Card, CardBody } from "@nextui-org/card";
import { getAllUserFiles } from "@/db";
import ErrorCard from "@/components/cards/ErrorCard";
import FileCard from "@/components/cards/FileCard";
import { getUsageData } from "@/db/redis/api";
import DataProgressBar from "@/components/ui/progress-bar";


export default async function Home() {
  const user = await currentUser();
  const userFiles = await getAllUserFiles(user?.username!);
  const { availableSpace, limit, dataUsage } = await getUsageData(
    user?.username!
  );

  return (
    <div className="container z-10 mx-auto px-4 space-y-3 py-6">
      <Card className="w-full bg-content1/90">
        <CardBody
          as="div"
          className="flex flex-row justify-between items-center"
        >
          <span className="text-lg justify-start">Dashboard</span>

          <UploadModal availableSpace={availableSpace}></UploadModal>
        </CardBody>
      </Card>
      <DataProgressBar dataUsage={dataUsage} limit={limit}></DataProgressBar>
      {userFiles.length ? (
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {userFiles.map(({ fileName, fileUrl, fileKey, fileSize }, i) => (
            <FileCard
              key={i}
              fileName={fileName}
              fileUrl={fileUrl}
              fileKey={fileKey}
              fileSize={fileSize}
              username={user?.username!}
            ></FileCard>
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
