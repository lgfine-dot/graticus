/*
 * Shared by netlify/functions/download.mts (writes) and download-stats.mts
 * (reads). Kept outside netlify/functions/ because every file in that folder
 * becomes a function of its own.
 */
export const STORE_NAME = "paper-downloads";
