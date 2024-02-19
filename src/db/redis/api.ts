'use server'

import { Redis } from "@upstash/redis"
import { redisSluggify } from "../../lib/utils"
import { revalidatePath } from "next/cache"
import { FileData } from "../types"


const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export const addFileToUser = async (username: string, fileName: string, fileKey: string) => {
  try {
    const fileData = JSON.stringify({ fileName, fileKey })
    await redis.sadd(redisSluggify(username), fileData)
  } catch (error) {
    console.error(error)
  }
}

export const getUserFiles = async (username: string) => {
  try {
    const files = await redis.smembers(redisSluggify(username)) as FileData[]
    return { files }  
  } catch (error) {
    console.error(error)
    return {files: []}
  }
}

export const deleteUserFile = async (username: string, fileName: string, fileKey: string) => {
  try {
    await redis.srem(redisSluggify(username), JSON.stringify({ fileName, fileKey }))
  } catch (error) {
    console.error(error)
  }
}