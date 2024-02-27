import { registerFormType } from "@/lib/validations/client-vals";

export type FileDataType = {
    fileName: string;
    fileKey: string;
    fileSize: number;
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
    plan: UserPlanType;
}

export type UserPlanType = 'special_grade' |'grade1' | 'grade2' | 'grade3'

export type RegisterDataType = registerFormType;