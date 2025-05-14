import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const tagRegistry = new Set<string>();
export const pathRegistry = new Set<string>();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function registerTag(tag: string) {
  tagRegistry.add(tag);
  return tag;
}

export function registerPath(path: string) {
  pathRegistry.add(path);
  return path;
}
