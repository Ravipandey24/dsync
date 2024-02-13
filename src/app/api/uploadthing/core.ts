import { sluggify } from "@/lib/utils";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";


const f = createUploadthing();
const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  fileUploader: f({
    image: { maxFileSize: "2MB", maxFileCount: 4 },
    video: { maxFileSize: "256MB", maxFileCount: 1 },
    pdf: { maxFileSize: "256MB", maxFileCount: 1 },
    audio: { maxFileSize: "128MB", maxFileCount: 1 },
    blob: { maxFileSize: "256MB", maxFileCount: 1 },
    text: { maxFileSize: "16MB", maxFileCount: 1 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, files }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");
      
      // const fileOverrides = files.map((file) => {
      //   const newName = sluggify(file.name);
      //   const myIdentifier = generateId();
      //   return { ...file, name: newName, customId: myIdentifier };
      // });
   
      // // Return userId to be used in onUploadComplete
      // return { foo: "bar" as const, [UTFiles]: fileOverrides };
   
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log(file)
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
