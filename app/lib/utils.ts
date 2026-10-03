import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  // Determine the appropriate unit by calculating the log
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Format with 2 decimal places and round
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export const generateUUID = () => crypto.randomUUID();

/**
 * Turns any thrown value (Error, string, Puter error object, ZodError, ...)
 * into a short message safe to display to the user.
 */
export function getErrorMessage(error: unknown): string {
  const raw =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : error && typeof error === "object" && "message" in error
          ? String((error as { message: unknown }).message)
          : "";

  if (!raw) return "Something went wrong. Please try again.";
  if (/puter\.js not available/i.test(raw))
    return "The AI service is unavailable. Please refresh the page and try again.";
  if (/quota|usage limit|insufficient|rate limit/i.test(raw))
    return "You have reached your Puter usage limit. Please try again later.";
  if (/not signed in|unauthorized|401/i.test(raw))
    return "Your session expired. Please sign in again.";
  if (/did not contain a JSON object|unexpected token|invalid_(union|type|literal|enum)/i.test(raw))
    return "The AI returned an unexpected response. Please try again.";

  // Never leak a stack trace or a raw JSON payload to the user.
  return raw.length > 180 ? `${raw.slice(0, 180)}...` : raw;
}

