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
