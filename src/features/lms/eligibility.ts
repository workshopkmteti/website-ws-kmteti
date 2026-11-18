export const MAX_ABSENCES_ALLOWED = 2;
export const TOTAL_SESSIONS = 6;
export const MAX_MATERIAL_SIZE_BYTES = 20 * 1024 * 1024;

const ALLOWED_PROJECT_HOSTS = new Set([
  "drive.google.com",
  "docs.google.com",
  "youtube.com",
  "www.youtube.com",
  "youtu.be",
  "github.com",
  "www.github.com",
]);

/** Returns true when the participant submitted the final project and missed at most 2 of 6 sessions. */
export function isCertificateEligible(finalProjectSubmitted: boolean, absences: number): boolean {
  return finalProjectSubmitted && absences >= 0 && absences <= MAX_ABSENCES_ALLOWED;
}

/** Validates that a final project link points to Google Drive, YouTube, or GitHub. */
export function isValidFinalProjectUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl.trim());
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;
    return ALLOWED_PROJECT_HOSTS.has(parsed.hostname.toLowerCase());
  } catch {
    return false;
  }
}

/** Validates that a training material file is non-empty and at most 20 MB. */
export function isValidMaterialFileSize(sizeBytes: number): boolean {
  return sizeBytes > 0 && sizeBytes <= MAX_MATERIAL_SIZE_BYTES;
}
