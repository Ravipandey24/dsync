import { addFileToUser, updateUserUsage } from "@/db/redis/api";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();
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
      const user = await currentUser();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { username: user.username };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      await addFileToUser(metadata.username!, {
        fileKey: file.key,
        fileName: file.name,
        fileSize: file.size,
      });
      await updateUserUsage(metadata.username!, file.size);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.username };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
