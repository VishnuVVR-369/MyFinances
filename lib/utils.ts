import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountToPaisa(amount: number) {
  return Math.round(amount * 100);
}

export function convertAmountFromPaisa(amount: number) {
  return amount / 100;
}
