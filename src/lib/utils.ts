import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sluggify(name: string, user: string) {
  return `${name}:${user}`;
}

export function decodeSlug(slug: string) {
  return { fileName: slug.split(":")[0], userName: slug.split(":")[1] };
}
