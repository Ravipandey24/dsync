'use server'

import { revalidatePath } from "next/cache";
import { deleteUserFile, getUserFiles } from "./redis/api";
import { deleteUTFile, getFileUrl } from "./uploadthing/api";


export const getAllUserFiles = async (username: string) => {
    try {
        const { files } = await getUserFiles(username);
        const parsedFiles = await Promise.all(files.map(async ({fileKey, fileName}) => {
            const { fileUrl } = await getFileUrl(fileKey);
            return { fileName, fileUrl, fileKey };
        }))
        return parsedFiles;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const deleteFile = async (username: string, fileName: string, fileKey: string) => {
    try {
        const { success } = await deleteUTFile(fileKey);
        if (success) {
            await deleteUserFile(username, fileName, fileKey);
        }
        revalidatePath('/')
        return {success};
    } catch (error) {
        console.error(error);
        return {success: false};
    }
}