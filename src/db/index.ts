"use server";

import { revalidatePath } from "next/cache";
import {
  deleteUser,
  deleteUserData,
  deleteUserFileDB,
  getAllUsers,
  getUserData,
  getUserFiles,
  updateUserUsage,
} from "./redis/api";
import { deleteUTFile, getFileUrl } from "./uploadthing/api";
import { FileDataType, UserDataType } from "./types";
import { clerkClient } from "@clerk/nextjs";

// user management
export const getAllUserData = async () => {
  try {
    const { users } = await getAllUsers();
    const allUserData = await Promise.all(
      users.map(async ({ username }) => {
        const { data } = await getUserData(username);
        return data!;
      })
    );
    return { allUserData };
  } catch (error) {
    console.error(error);
    return { allUserData: [] };
  }
};

export const deleteUserCompletely = async (userData: UserDataType) => {
  try {
    const {userId, username, email } = userData;
    await clerkClient.users.deleteUser(userId);
    await deleteUser({username, email});
    await deleteUserData(userData);
    await deleteAllUserFiles(username);
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

// file management
export const getAllUserFiles = async (username: string) => {
  try {
    const { files } = await getUserFiles(username);
    const parsedFiles = await Promise.all(
      files.map(async ({ fileKey, fileName, fileSize }) => {
        const { fileUrl } = await getFileUrl(fileKey);
        return { fileName, fileUrl, fileKey, fileSize };
      })
    );
    return parsedFiles;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteFile = async (
  username: string,
  fileData: FileDataType
) => {
  try {
    const { success } = await deleteUTFile(fileData.fileKey);
    if (success) {
      await deleteUserFileDB(username, fileData);
      await updateUserUsage(username, -fileData.fileSize);
    }
    revalidatePath("/");
    return { success };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const deleteAllUserFiles = async (username: string) => {
  try {
    const { files } = await getUserFiles(username);
    await Promise.all(
      files.map(async (fileData) => {
        await deleteFile(username, fileData);
      })
    );
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
