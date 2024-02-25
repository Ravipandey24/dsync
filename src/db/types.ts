import { registerFormType } from "@/lib/validations/client-vals";

export type FileDataType = {
    fileName: string;
    fileKey: string;
}

export type UserType = {
    username: string;
    email: string;
}

export type UserDataType = {
    userId: string;
    username: string;
    email: string;
    profession: string;
    role: 'user' | 'admin';
    dataUsage: number;
}

export type RegisterDataType = registerFormType;