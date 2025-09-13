"use server";

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

interface QueryFilter {
  [key: string]: unknown;
}

interface UpdateData {
  [key: string]: unknown;
}

interface JoinOptions {
  collection: string;
  localField: string;
  foreignField: string;
  as: string;
}

interface FindOptions {
  skip?: number;
  limit?: number;
  sort?: { [key: string]: 1 | -1 };
}

interface DatabaseRecord {
  id?: string | number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

// Helper functions
function getFilePath(fileName: string): string {
  const __filename = fileURLToPath(import.meta.url);
  const basePath = path.dirname(__filename);
  return path.join(basePath, fileName);
}

async function readCollection(collection: string): Promise<DatabaseRecord[]> {
  try {
    const fullPath = getFilePath(`${collection}.json`);
    const raw = await fs.readFile(fullPath, "utf8");

    // Validate JSON before parsing
    if (!raw.trim()) {
      console.warn(`Empty file detected: ${collection}.json`);
      return [];
    }

    const parsed = JSON.parse(raw);

    // Ensure we have an array
    if (!Array.isArray(parsed)) {
      console.error(
        `Invalid data structure in ${collection}.json - expected array`,
      );
      return [];
    }

    return parsed;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log(
        `Collection ${collection}.json not found, creating empty collection`,
      );
      return [];
    }

    if (error instanceof SyntaxError) {
      console.error(`JSON syntax error in ${collection}.json:`, error.message);
      console.error(`Creating backup and resetting collection...`);

      // Create backup of corrupted file
      try {
        const backupPath = getFilePath(
          `${collection}.json.backup.${Date.now()}`,
        );
        const corruptedContent = await fs.readFile(
          getFilePath(`${collection}.json`),
          "utf8",
        );
        await fs.writeFile(backupPath, corruptedContent, "utf-8");
        console.log(`Backup created: ${backupPath}`);
      } catch (backupError) {
        console.error("Failed to create backup:", backupError);
      }

      // Reset to empty array
      await writeCollection(collection, []);
      return [];
    }

    throw error;
  }
}

async function writeCollection(
  collection: string,
  data: DatabaseRecord[],
): Promise<void> {
  const fullPath = getFilePath(`${collection}.json`);
  const tempPath = `${fullPath}.tmp`;

  try {
    // Validate data before writing
    if (!Array.isArray(data)) {
      throw new Error(`Data must be an array, got ${typeof data}`);
    }

    // Create a formatted JSON string
    const jsonString = JSON.stringify(data, null, 2);

    // Validate the JSON can be parsed back (safety check)
    JSON.parse(jsonString);

    // Ensure directory exists
    await fs.mkdir(path.dirname(fullPath), { recursive: true });

    // Write to a temporary file first
    await fs.writeFile(tempPath, jsonString, "utf-8");

    // Verify temp file was created and has content
    const tempStats = await fs.stat(tempPath);
    if (tempStats.size === 0) {
      throw new Error(`Temporary file ${tempPath} is empty`);
    }

    // Rename temp file to actual file (atomic operation)
    await fs.rename(tempPath, fullPath);

    console.log(
      `Successfully wrote ${data.length} records to ${collection}.json`,
    );
  } catch (error) {
    console.error(`Error writing to ${collection}:`, error);

    // Clean up temp file if it exists
    try {
      await fs.unlink(tempPath);
      console.log(`Cleaned up temporary file: ${tempPath}`);
    } catch (cleanupError) {
      // Ignore cleanup errors, but log them
      console.warn(`Could not clean up temp file ${tempPath}:`, cleanupError);
    }

    // If rename failed but temp file exists, try direct write as fallback
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === "ENOENT" && nodeError.message?.includes("rename")) {
      try {
        console.log(`Fallback: Writing directly to ${collection}.json`);
        const jsonString = JSON.stringify(data, null, 2);
        await fs.writeFile(fullPath, jsonString, "utf-8");
        console.log(`Fallback write successful for ${collection}.json`);
        return;
      } catch (fallbackError) {
        console.error(`Fallback write also failed:`, fallbackError);
      }
    }

    throw error;
  }
}

function matchesFilter(item: DatabaseRecord, filter: QueryFilter): boolean {
  return Object.entries(filter).every(([key, value]) => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      // Handle operators like { $gt: 5 }, { $in: [1,2,3] }
      return Object.entries(value as Record<string, unknown>).every(
        ([operator, operatorValue]) => {
          switch (operator) {
            case "$gt":
              return (
                typeof item[key] === "number" &&
                typeof operatorValue === "number" &&
                item[key] > operatorValue
              );
            case "$gte":
              return (
                typeof item[key] === "number" &&
                typeof operatorValue === "number" &&
                item[key] >= operatorValue
              );
            case "$lt":
              return (
                typeof item[key] === "number" &&
                typeof operatorValue === "number" &&
                item[key] < operatorValue
              );
            case "$lte":
              return (
                typeof item[key] === "number" &&
                typeof operatorValue === "number" &&
                item[key] <= operatorValue
              );
            case "$ne":
              return item[key] !== operatorValue;
            case "$in":
              return (
                Array.isArray(operatorValue) &&
                operatorValue.includes(item[key])
              );
            case "$nin":
              return (
                Array.isArray(operatorValue) &&
                !operatorValue.includes(item[key])
              );
            case "$regex":
              return (
                typeof operatorValue === "string" &&
                typeof item[key] === "string" &&
                new RegExp(operatorValue).test(item[key])
              );
            default:
              return item[key] === value;
          }
        },
      );
    }
    return item[key] === value;
  });
}

// Server action wrappers for the database
export async function findRecords(
  collection: string,
  filter: QueryFilter = {},
  options: FindOptions = {},
): Promise<DatabaseRecord[]> {
  const data = await readCollection(collection);
  let results = data.filter((item) => matchesFilter(item, filter));

  // Apply sorting if specified
  if (options.sort) {
    const sortKey = Object.keys(options.sort)[0];
    const sortOrder = options.sort[sortKey];
    results.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      // Convert to comparable values
      const aComp =
        typeof aVal === "string" || typeof aVal === "number"
          ? aVal
          : String(aVal);
      const bComp =
        typeof bVal === "string" || typeof bVal === "number"
          ? bVal
          : String(bVal);

      if (sortOrder === 1) {
        return aComp > bComp ? 1 : aComp < bComp ? -1 : 0;
      }
      return aComp < bComp ? 1 : aComp > bComp ? -1 : 0;
    });
  }

  // Apply skip if specified
  if (options.skip && options.skip > 0) {
    results = results.slice(options.skip);
  }

  // Apply limit if specified
  if (options.limit && options.limit > 0) {
    results = results.slice(0, options.limit);
  }

  return results;
}

export async function findOneRecord(
  collection: string,
  filter: QueryFilter = {},
): Promise<DatabaseRecord | null> {
  const data = await readCollection(collection);
  return data.find((item) => matchesFilter(item, filter)) || null;
}

export async function findRecordById(
  collection: string,
  id: string | number,
): Promise<DatabaseRecord | null> {
  return findOneRecord(collection, { id });
}

export async function insertRecord(
  collection: string,
  document: Omit<DatabaseRecord, "createdAt" | "updatedAt">,
): Promise<DatabaseRecord> {
  const data = await readCollection(collection);
  const newDoc: DatabaseRecord = {
    ...document,
    id: (document.id as string | number) || Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  data.push(newDoc);
  await writeCollection(collection, data);
  return newDoc;
}

export async function insertManyRecords(
  collection: string,
  documents: Omit<DatabaseRecord, "createdAt" | "updatedAt">[],
): Promise<DatabaseRecord[]> {
  const data = await readCollection(collection);
  const newDocs: DatabaseRecord[] = documents.map((doc, index) => ({
    ...doc,
    id: (doc.id as string | number) || Date.now() + index,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
  data.push(...newDocs);
  await writeCollection(collection, data);
  return newDocs;
}

export async function updateRecord(
  collection: string,
  filter: QueryFilter,
  update: UpdateData,
): Promise<DatabaseRecord | null> {
  const data = await readCollection(collection);
  const index = data.findIndex((item) => matchesFilter(item, filter));

  if (index === -1) return null;

  data[index] = {
    ...data[index],
    ...update,
    updatedAt: new Date().toISOString(),
  };

  await writeCollection(collection, data);
  return data[index];
}

export async function updateManyRecords(
  collection: string,
  filter: QueryFilter,
  update: UpdateData,
): Promise<number> {
  const data = await readCollection(collection);
  let updatedCount = 0;

  for (let i = 0; i < data.length; i++) {
    if (matchesFilter(data[i], filter)) {
      data[i] = {
        ...data[i],
        ...update,
        updatedAt: new Date().toISOString(),
      };
      updatedCount++;
    }
  }

  if (updatedCount > 0) {
    await writeCollection(collection, data);
  }

  return updatedCount;
}

export async function deleteRecord(
  collection: string,
  filter: QueryFilter,
): Promise<boolean> {
  const data = await readCollection(collection);
  const index = data.findIndex((item) => matchesFilter(item, filter));

  if (index === -1) return false;

  data.splice(index, 1);
  await writeCollection(collection, data);
  return true;
}

export async function deleteManyRecords(
  collection: string,
  filter: QueryFilter,
): Promise<number> {
  const data = await readCollection(collection);
  const initialLength = data.length;
  const filtered = data.filter((item) => !matchesFilter(item, filter));

  if (filtered.length !== initialLength) {
    await writeCollection(collection, filtered);
  }

  return initialLength - filtered.length;
}

export async function countRecords(
  collection: string,
  filter: QueryFilter = {},
): Promise<number> {
  const data = await readCollection(collection);
  return data.filter((item) => matchesFilter(item, filter)).length;
}

// Pagination helpers
export async function findRecordsWithPagination(
  collection: string,
  filter: QueryFilter = {},
  page: number = 1,
  pageSize: number = 10,
  sort?: { [key: string]: 1 | -1 },
): Promise<{
  data: DatabaseRecord[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}> {
  const skip = (page - 1) * pageSize;
  const total = await countRecords(collection, filter);
  const totalPages = Math.ceil(total / pageSize);

  const data = await findRecords(collection, filter, {
    skip,
    limit: pageSize,
    sort,
  });

  return {
    data,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

export async function skipRecords(
  collection: string,
  filter: QueryFilter = {},
  skipCount: number,
): Promise<DatabaseRecord[]> {
  return findRecords(collection, filter, { skip: skipCount });
}

export async function limitRecords(
  collection: string,
  filter: QueryFilter = {},
  limitCount: number,
): Promise<DatabaseRecord[]> {
  return findRecords(collection, filter, { limit: limitCount });
}

export async function skipAndLimit(
  collection: string,
  filter: QueryFilter = {},
  skipCount: number,
  limitCount: number,
): Promise<DatabaseRecord[]> {
  return findRecords(collection, filter, {
    skip: skipCount,
    limit: limitCount,
  });
}

export async function sortRecords(
  collection: string,
  filter: QueryFilter = {},
  sort: { [key: string]: 1 | -1 },
): Promise<DatabaseRecord[]> {
  return findRecords(collection, filter, { sort });
}

export async function findRecordsSorted(
  collection: string,
  filter: QueryFilter = {},
  sortField: string,
  sortOrder: 1 | -1 = 1,
): Promise<DatabaseRecord[]> {
  return findRecords(collection, filter, {
    sort: { [sortField]: sortOrder },
  });
}

export async function findWithJoinRecords(
  collection: string,
  filter: QueryFilter = {},
  joins: JoinOptions[],
  options: FindOptions = {},
): Promise<DatabaseRecord[]> {
  const mainData = await findRecords(collection, filter, options);

  for (const join of joins) {
    const joinData = await readCollection(join.collection);

    mainData.forEach((item) => {
      const relatedItems = joinData.filter(
        (joinItem) => joinItem[join.foreignField] === item[join.localField],
      );
      item[join.as] = relatedItems;
    });
  }

  return mainData;
}

export async function aggregateRecords(
  collection: string,
  pipeline: Record<string, unknown>[],
): Promise<DatabaseRecord[]> {
  let data = await readCollection(collection);

  for (const stage of pipeline) {
    if (stage.$match && typeof stage.$match === "object") {
      data = data.filter((item) =>
        matchesFilter(item, stage.$match as QueryFilter),
      );
    }

    if (stage.$sort && typeof stage.$sort === "object") {
      const sortObj = stage.$sort as Record<string, number>;
      const sortKey = Object.keys(sortObj)[0];
      const sortOrder = sortObj[sortKey];
      data.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];

        // Convert to comparable values
        const aComp =
          typeof aVal === "string" || typeof aVal === "number"
            ? aVal
            : String(aVal);
        const bComp =
          typeof bVal === "string" || typeof bVal === "number"
            ? bVal
            : String(bVal);

        if (sortOrder === 1) {
          return aComp > bComp ? 1 : aComp < bComp ? -1 : 0;
        }
        return aComp < bComp ? 1 : aComp > bComp ? -1 : 0;
      });
    }

    if (stage.$limit && typeof stage.$limit === "number") {
      data = data.slice(0, stage.$limit);
    }

    if (stage.$skip && typeof stage.$skip === "number") {
      data = data.slice(stage.$skip);
    }
  }

  return data;
}

// Utility function to check and repair JSON files
export async function repairCollection(
  collection: string,
): Promise<{ repaired: boolean; recordCount: number }> {
  try {
    const data = await readCollection(collection);
    return { repaired: false, recordCount: data.length };
  } catch {
    console.log(`Repairing collection ${collection}...`);
    await writeCollection(collection, []);
    return { repaired: true, recordCount: 0 };
  }
}

// Utility function to validate all collections
export async function validateAllCollections(): Promise<
  Record<string, { valid: boolean; recordCount: number }>
> {
  const collections = ["messages", "chats"]; // Add your collection names here
  const results: Record<string, { valid: boolean; recordCount: number }> = {};

  for (const collection of collections) {
    try {
      const data = await readCollection(collection);
      results[collection] = { valid: true, recordCount: data.length };
    } catch (error) {
      console.error(`Collection ${collection} is invalid:`, error);
      results[collection] = { valid: false, recordCount: 0 };
    }
  }

  return results;
}
