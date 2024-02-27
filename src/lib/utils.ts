import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";


var generator = require('generate-password');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function redisSluggify(username: string) {
  return `user:${username}:files`;
}

export const formatByteData = (size: number) => {
  if(size > 1073741824) {
    return `${(size / 1073741824).toFixed(2)} GB`;
  }
  else if (size > 1048576) {
    return `${(size / 1048576).toFixed(2)} MB`;
  } else {
    return `${(size / 1024).toFixed(2)} KB`;
  }
}



export const getPercentage = (used: number, total: number) => {
  return Number(((used / total) * 100).toFixed(2));
}

export function generatedPassword() {
  return generator.generate({
    length: 8,
    uppercase: false
  }) as string;
}