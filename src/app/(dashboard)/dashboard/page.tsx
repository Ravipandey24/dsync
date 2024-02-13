import { UploadIcon } from "@/components/Icons";
import UploadModal from "@/components/UploadSection";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { getAllFiles } from "@/lib/uploadthing/api";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";

export default async function Home() {
  const { files } = await getAllFiles()
  console.log(files)
  return (
    <div className="min-h-screen absolute top-0 w-full antialiased">
      <div className="container z-10 mx-auto mt-16 space-y-3 py-6">
        <Card className="w-full">
          <CardBody
            as="div"
            className="flex flex-row justify-between items-center"
          >
            <span className="text-lg ">Dashboard</span>
            <UploadModal></UploadModal>
          </CardBody>
        </Card>
        <div>
          <ul></ul>
          {files.map((file) => <li><a href={'https://utfs.io/f/' + file.key}>nigga</a></li>)}
        </div>
      </div>
      {/* <BackgroundBeams /> */}
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
