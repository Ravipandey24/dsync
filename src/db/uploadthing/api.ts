"use server";

import { UTApi } from "uploadthing/server";
const utapi = new UTApi();

export const getAllFiles = async () => {
  try {
    const files = await utapi.listFiles({
      limit: 1000,
      offset: 0,
    });
    return { files };
  } catch (error: any) {
    console.error(error);
    return { files: [] };
  }
};

export const getFileUrl = async (fileKey: string) => {
  try {
    const file = await utapi.getFileUrls(fileKey);
    return { fileUrl: file[0].url };
  } catch (error: any) {
    console.error(error);
    return { fileUrl: null };
  }
}

export const deleteUTFile = async (fileKey: string) => {
  try {
    const { success } = await utapi.deleteFiles(fileKey);
    return { success };
  } catch (error: any) {
    console.error(error);
    return { success: false };
  }
}
