"use server";

import { Redis } from "@upstash/redis";
import { generatedPassword, redisSluggify } from "../../lib/utils";
import { revalidatePath } from "next/cache";
import {
  FileDataType,
  UserDataType,
  RegisterDataType,
  UserType,
} from "../types";
import { clerkClient } from "@clerk/nextjs";
import { sendRegisterationEmail } from "@/lib/nodemailer";


const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// User Management
export const addUser = async (user: UserType) => {
  try {
    await redis.sadd("users", user);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const getAllUsers = async () => {
  try {
    const users = (await redis.smembers("users")) as UserType[];
    return { users };
  } catch (error) {
    console.error(error);
    return { users: [] };
  }
};

export const deleteUser = async (userData: UserType) => {
  try {
    await redis.srem("users", userData);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

// User Data Management
export const createUserData = async (userData: UserDataType) => {
  try {
    await redis.hset(`user:${userData.username}:data`, userData);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const getUserData = async (username: string) => {
  try {
    const data = (await redis.hgetall(`user:${username}:data`)) as UserDataType;
    return { data };
  } catch (error) {
    console.error(error);
    return { data: null };
  }
};

export const deleteUserData = async (userData: UserDataType) => {
  try {
    await redis.hdel(`user:${userData.username}:data`, ...Object.keys(userData));
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

// User Registration
export const createRegisterationRequest = async (
  registerData: RegisterDataType
) => {
  try {
    const { users } = await getAllUsers();
    const isEmailAlreadyPresent = users.some(
      (user) => user.email === registerData.email
    );
    const isUsernameAlreadyPresent = users.some(
      (user) => user.username === registerData.username
    );
    if (isEmailAlreadyPresent) {
      return {
        success: false,
        message: "A user already exists with this email!",
      };
    }
    if (isUsernameAlreadyPresent) {
      return {
        success: false,
        message: "A user already exists with this username!",
      };
    }

    const { requests } = await getRegisterationRequests();
    const isAlreadyRequested = requests.some(
      (request) => request.email === registerData.email
    );
    if (isAlreadyRequested) {
      return {
        success: false,
        message: "A request already exists for this email!",
      };
    }

    await redis.sadd("registeration_request", registerData);
    revalidatePath("/admin");
    return { success: true, message: "Request sent successfully" };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const getRegisterationRequests = async () => {
  try {
    const requests = (await redis.smembers(
      "registeration_request"
    )) as RegisterDataType[];
    return { requests };
  } catch (error) {
    console.error(error);
    return { requests: [] };
  }
};

export const deleteRegisterationRequest = async (
  registerData: RegisterDataType
) => {
  try {
    await redis.srem("registeration_request", registerData);
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const approveRegisterationRequest = async (
  registerData: RegisterDataType
) => {
  try {
    const { username, email, profession } = registerData;
    const password = generatedPassword();
    const { id: userId } = await clerkClient.users.createUser({
      username,
      emailAddress: [email],
      password,
      publicMetadata: {
        profession,
      },
    });
    if (!userId) {
      return { success: false, message: "Failed to create clerk user!" };
    }
    const { success: addUserStatus } = await addUser({ username, email });
    const { success: addUserDataStatus } = await createUserData({
      userId,
      username,
      email,
      profession,
      role: "user",
      dataUsage: 0,
    });
    if (!addUserStatus || !addUserDataStatus) {
      return { success: false, message: "Failed to add user to database!" };
    }

    const { success } = await sendRegisterationEmail(email, username, password);
    if (!success) {
      return { success: false, message: "Failed to send email to the user!" };
    }

    const { success: deleteRegisterationStatus } =
      await deleteRegisterationRequest(registerData);
    if (!deleteRegisterationStatus) {
      return { success: false, message: "Failed to delete request!" };
    }

    revalidatePath("/admin");
    return { success: true, message: "User created successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "something went wrong!" };
  }
};

// User File Management
export const addFileToUser = async (
  username: string,
  fileName: string,
  fileKey: string
) => {
  try {
    const fileData = { fileName, fileKey };
    await redis.sadd(redisSluggify(username), fileData);
  } catch (error) {
    console.error(error);
  }
};

export const getUserFiles = async (username: string) => {
  try {
    const files = (await redis.smembers(
      redisSluggify(username)
    )) as FileDataType[];
    return { files };
  } catch (error) {
    console.error(error);
    return { files: [] };
  }
};

export const deleteUserFileDB = async (
  username: string,
  fileName: string,
  fileKey: string
) => {
  try {
    await redis.srem(redisSluggify(username), { fileName, fileKey });
  } catch (error) {
    console.error(error);
  }
};
