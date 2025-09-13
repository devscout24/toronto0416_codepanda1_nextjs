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

interface DatabaseRecord {
  id?: string | number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

class JSONDatabase {
  private basePath: string;

  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    this.basePath = path.dirname(__filename);
  }

  private getFilePath(fileName: string): string {
    return path.join(this.basePath, fileName);
  }

  private async readCollection(collection: string): Promise<DatabaseRecord[]> {
    try {
      const fullPath = this.getFilePath(`${collection}.json`);
      const raw = await fs.readFile(fullPath, "utf8");
      return JSON.parse(raw) || [];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  private async writeCollection(
    collection: string,
    data: DatabaseRecord[],
  ): Promise<void> {
    try {
      const fullPath = this.getFilePath(`${collection}.json`);
      await fs.writeFile(fullPath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.error(`Error writing to ${collection}:`, error);
      throw error;
    }
  }

  private matchesFilter(item: DatabaseRecord, filter: QueryFilter): boolean {
    return Object.entries(filter).every(([key, value]) => {
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
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

  // MongoDB-like methods
  async find(
    collection: string,
    filter: QueryFilter = {},
  ): Promise<DatabaseRecord[]> {
    const data = await this.readCollection(collection);
    return data.filter((item) => this.matchesFilter(item, filter));
  }

  async findOne(
    collection: string,
    filter: QueryFilter = {},
  ): Promise<DatabaseRecord | null> {
    const data = await this.readCollection(collection);
    return data.find((item) => this.matchesFilter(item, filter)) || null;
  }

  async findById(
    collection: string,
    id: string | number,
  ): Promise<DatabaseRecord | null> {
    return this.findOne(collection, { id });
  }

  async insertOne(
    collection: string,
    document: Omit<DatabaseRecord, "createdAt" | "updatedAt">,
  ): Promise<DatabaseRecord> {
    const data = await this.readCollection(collection);
    const newDoc: DatabaseRecord = {
      ...document,
      id: (document.id as string | number) || Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.push(newDoc);
    await this.writeCollection(collection, data);
    return newDoc;
  }

  async insertMany(
    collection: string,
    documents: Omit<DatabaseRecord, "createdAt" | "updatedAt">[],
  ): Promise<DatabaseRecord[]> {
    const data = await this.readCollection(collection);
    const newDocs: DatabaseRecord[] = documents.map((doc, index) => ({
      ...doc,
      id: (doc.id as string | number) || Date.now() + index,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    data.push(...newDocs);
    await this.writeCollection(collection, data);
    return newDocs;
  }

  async updateOne(
    collection: string,
    filter: QueryFilter,
    update: UpdateData,
  ): Promise<DatabaseRecord | null> {
    const data = await this.readCollection(collection);
    const index = data.findIndex((item) => this.matchesFilter(item, filter));

    if (index === -1) return null;

    data[index] = {
      ...data[index],
      ...update,
      updatedAt: new Date().toISOString(),
    };

    await this.writeCollection(collection, data);
    return data[index];
  }

  async updateMany(
    collection: string,
    filter: QueryFilter,
    update: UpdateData,
  ): Promise<number> {
    const data = await this.readCollection(collection);
    let updatedCount = 0;

    for (let i = 0; i < data.length; i++) {
      if (this.matchesFilter(data[i], filter)) {
        data[i] = {
          ...data[i],
          ...update,
          updatedAt: new Date().toISOString(),
        };
        updatedCount++;
      }
    }

    if (updatedCount > 0) {
      await this.writeCollection(collection, data);
    }

    return updatedCount;
  }

  async deleteOne(collection: string, filter: QueryFilter): Promise<boolean> {
    const data = await this.readCollection(collection);
    const index = data.findIndex((item) => this.matchesFilter(item, filter));

    if (index === -1) return false;

    data.splice(index, 1);
    await this.writeCollection(collection, data);
    return true;
  }

  async deleteMany(collection: string, filter: QueryFilter): Promise<number> {
    const data = await this.readCollection(collection);
    const initialLength = data.length;
    const filtered = data.filter((item) => !this.matchesFilter(item, filter));

    if (filtered.length !== initialLength) {
      await this.writeCollection(collection, filtered);
    }

    return initialLength - filtered.length;
  }

  async count(collection: string, filter: QueryFilter = {}): Promise<number> {
    const data = await this.readCollection(collection);
    return data.filter((item) => this.matchesFilter(item, filter)).length;
  }

  // Relational find method (like SQL JOIN)
  async findWithJoin(
    collection: string,
    filter: QueryFilter = {},
    joins: JoinOptions[],
  ): Promise<DatabaseRecord[]> {
    const mainData = await this.find(collection, filter);

    for (const join of joins) {
      const joinData = await this.readCollection(join.collection);

      mainData.forEach((item) => {
        const relatedItems = joinData.filter(
          (joinItem) => joinItem[join.foreignField] === item[join.localField],
        );
        item[join.as] = relatedItems;
      });
    }

    return mainData;
  }

  // Aggregate-like functionality
  async aggregate(
    collection: string,
    pipeline: Record<string, unknown>[],
  ): Promise<DatabaseRecord[]> {
    let data = await this.readCollection(collection);

    for (const stage of pipeline) {
      if (stage.$match && typeof stage.$match === "object") {
        data = data.filter((item) =>
          this.matchesFilter(item, stage.$match as QueryFilter),
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

  // Public method to write collection (for legacy compatibility)
  async writeCollectionPublic(
    collection: string,
    data: DatabaseRecord[],
  ): Promise<void> {
    await this.writeCollection(collection, data);
  }
}

// Export singleton instance
export const db = new JSONDatabase();
