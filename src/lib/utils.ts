import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";


var generator = require('generate-password');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function redisSluggify(username: string) {
  return `user:${username}:files`;
}

export function generatedPassword() {
  return generator.generate({
    length: 8,
    uppercase: false
  }) as string;
}