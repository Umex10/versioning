import fs from 'fs';

/**
 * Reads and parses a JSON file, returning an empty array on error.
 * @param filePath Path to the JSON file
 * @returns {T[]} Parsed array or empty array
 */
export const readJsonFile = <T>(filePath: string): T[] => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};
