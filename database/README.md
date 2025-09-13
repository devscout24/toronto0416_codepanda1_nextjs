# 📁 JSON Database Documentation

A simple, MongoDB-like database system that stores data in JSON files. Perfect for small to medium projects that don't need a full database server.

## 🚀 Quick Start

This database system works with JSON files stored in the `database/` folder. Each collection is a separate `.json` file.

### Basic Example

```typescript
import { findRecords, insertRecord } from "@/database/actions";

// Get all messages
const messages = await findRecords("messages");

// Add a new message
await insertRecord("messages", {
  content: "Hello World!",
  sender: "user",
});
```

## 📂 File Structure

```
database/
├── actions.ts       # Server actions (use these in your app)
├── index.ts         # Core database class
├── messages.json    # Example collection
├── chats.json      # Example collection
└── README.md       # This documentation
```

## 🔧 Available Functions

### 📖 Reading Data

#### `findRecords(collection, filter?)`

Get multiple records from a collection.

```typescript
// Get all messages
const allMessages = await findRecords("messages");

// Get messages with a filter
const unreadMessages = await findRecords("messages", { status: "unread" });

// Get messages from a specific user
const userMessages = await findRecords("messages", { sender: "john" });
```

#### `findOneRecord(collection, filter?)`

Get the first record that matches the filter.

```typescript
// Get the first message
const firstMessage = await findOneRecord("messages");

// Get a specific message
const message = await findOneRecord("messages", { id: 123 });
```

#### `findRecordById(collection, id)`

Get a record by its ID (shortcut for findOneRecord).

```typescript
// Get message with ID 123
const message = await findRecordById("messages", 123);
```

#### `countRecords(collection, filter?)`

Count how many records match the filter.

```typescript
// Count all messages
const totalMessages = await countRecords("messages");

// Count unread messages
const unreadCount = await countRecords("messages", { status: "unread" });
```

## 📄 Pagination & Sorting

### `findRecords(collection, filter?, options?)`

Enhanced version with pagination and sorting options.

```typescript
// Basic usage (same as before)
const messages = await findRecords("messages");

// With sorting
const sortedMessages = await findRecords(
  "messages",
  {},
  {
    sort: { createdAt: -1 }, // -1 for descending, 1 for ascending
  },
);

// With pagination
const pagedMessages = await findRecords(
  "messages",
  {},
  {
    skip: 10, // Skip first 10 records
    limit: 5, // Take only 5 records
  },
);

// Combined: sorted and paginated
const results = await findRecords(
  "messages",
  { status: "unread" },
  {
    sort: { createdAt: -1 },
    skip: 0,
    limit: 10,
  },
);
```

### `findRecordsWithPagination(collection, filter?, page?, pageSize?, sort?)`

Complete pagination with metadata.

```typescript
const result = await findRecordsWithPagination(
  "messages", // collection
  { status: "unread" }, // filter
  1, // page number (1-based)
  10, // page size
  { createdAt: -1 }, // sort order
);

// Result structure:
// {
//   data: [...],           // The actual records
//   pagination: {
//     page: 1,             // Current page
//     pageSize: 10,        // Records per page
//     total: 45,           // Total records matching filter
//     totalPages: 5,       // Total pages
//     hasNext: true,       // Has next page
//     hasPrev: false       // Has previous page
//   }
// }
```

### Convenience Functions

#### `skipRecords(collection, filter?, skipCount)`

Skip a number of records.

```typescript
// Skip first 20 messages
const messages = await skipRecords("messages", {}, 20);
```

#### `limitRecords(collection, filter?, limitCount)`

Limit the number of records returned.

```typescript
// Get only first 5 messages
const latestMessages = await limitRecords("messages", {}, 5);
```

#### `skipAndLimit(collection, filter?, skipCount, limitCount)`

Combine skip and limit.

```typescript
// Skip 10, take 5 (like getting page 3 with 5 items per page)
const messages = await skipAndLimit("messages", {}, 10, 5);
```

#### `sortRecords(collection, filter?, sort)`

Sort records by field.

```typescript
// Sort by creation date (newest first)
const sorted = await sortRecords("messages", {}, { createdAt: -1 });

// Sort by multiple fields
const sorted = await sortRecords(
  "messages",
  {},
  {
    priority: -1, // High priority first
    createdAt: 1, // Then by oldest first
  },
);
```

#### `findRecordsSorted(collection, filter?, sortField, sortOrder?)`

Simple sorting by single field.

```typescript
// Sort messages by creation date (ascending by default)
const oldest = await findRecordsSorted("messages", {}, "createdAt");

// Sort by creation date descending
const newest = await findRecordsSorted("messages", {}, "createdAt", -1);
```

### ✏️ Creating Data

#### `insertRecord(collection, document)`

Add a single new record.

```typescript
await insertRecord("messages", {
  content: "Hello World!",
  sender: "john",
  status: "unread",
});

// The system automatically adds:
// - id (if not provided)
// - createdAt (timestamp)
// - updatedAt (timestamp)
```

#### `insertManyRecords(collection, documents)`

Add multiple records at once.

```typescript
await insertManyRecords("messages", [
  { content: "Message 1", sender: "john" },
  { content: "Message 2", sender: "jane" },
  { content: "Message 3", sender: "bob" },
]);
```

### 🔄 Updating Data

#### `updateRecord(collection, filter, update)`

Update the first record that matches the filter.

```typescript
// Mark a message as read
await updateRecord("messages", { id: 123 }, { status: "read" });

// Update sender name
await updateRecord("messages", { sender: "john" }, { sender: "John Smith" });
```

#### `updateManyRecords(collection, filter, update)`

Update all records that match the filter. Returns the number of updated records.

```typescript
// Mark all messages as read
const updatedCount = await updateManyRecords(
  "messages",
  { status: "unread" },
  { status: "read" },
);

console.log(`Updated ${updatedCount} messages`);
```

### 🗑️ Deleting Data

#### `deleteRecord(collection, filter)`

Delete the first record that matches the filter. Returns `true` if deleted, `false` if not found.

```typescript
// Delete a specific message
const deleted = await deleteRecord("messages", { id: 123 });

if (deleted) {
  console.log("Message deleted!");
} else {
  console.log("Message not found");
}
```

#### `deleteManyRecords(collection, filter)`

Delete all records that match the filter. Returns the number of deleted records.

```typescript
// Delete all messages from a user
const deletedCount = await deleteManyRecords("messages", { sender: "john" });

console.log(`Deleted ${deletedCount} messages`);
```

## 🎯 Advanced Filtering

You can use MongoDB-style operators for complex queries:

### Comparison Operators

```typescript
// Greater than
const recentMessages = await findRecords("messages", {
  id: { $gt: 100 },
});

// Greater than or equal
const fromId50 = await findRecords("messages", {
  id: { $gte: 50 },
});

// Less than
const oldMessages = await findRecords("messages", {
  id: { $lt: 100 },
});

// Less than or equal
const upToId50 = await findRecords("messages", {
  id: { $lte: 50 },
});

// Not equal
const notFromJohn = await findRecords("messages", {
  sender: { $ne: "john" },
});
```

### Array Operators

```typescript
// In array (OR condition)
const specificSenders = await findRecords("messages", {
  sender: { $in: ["john", "jane", "bob"] },
});

// Not in array
const excludeSenders = await findRecords("messages", {
  sender: { $nin: ["spam", "bot"] },
});
```

### Text Search

```typescript
// Regex search (case-insensitive)
const searchResults = await findRecords("messages", {
  content: { $regex: "hello" },
});
```

### Combining Filters

```typescript
// Multiple conditions (AND)
const complexQuery = await findRecords("messages", {
  sender: "john",
  status: "unread",
  id: { $gt: 50 },
});
```

## 🔗 Relational Queries (JOINs)

Connect data from multiple collections like SQL JOINs:

```typescript
// Get messages with their related chat data
const messagesWithChats = await findWithJoinRecords(
  "messages", // Main collection
  { status: "unread" }, // Filter for main collection
  [
    // Array of joins
    {
      collection: "chats", // Collection to join
      localField: "chatId", // Field in messages
      foreignField: "id", // Field in chats
      as: "chatDetails", // Name for joined data
    },
  ],
);

// Result structure:
// [
//   {
//     id: 1,
//     content: "Hello",
//     chatId: 5,
//     chatDetails: [
//       { id: 5, name: "General Chat", participants: [...] }
//     ]
//   }
// ]
```

## 📊 Aggregation Pipeline

Process data with multiple steps like MongoDB aggregation:

```typescript
const pipeline = [
  // Step 1: Filter records
  { $match: { status: "published" } },

  // Step 2: Sort by creation date (1 = ascending, -1 = descending)
  { $sort: { createdAt: -1 } },

  // Step 3: Skip first 10 records
  { $skip: 10 },

  // Step 4: Take only 5 records
  { $limit: 5 },
];

const results = await aggregateRecords("messages", pipeline);
```

## 🛠️ Real-World Examples

### 📧 Message System

```typescript
// Create a new message
const newMessage = await insertRecord("messages", {
  content: "Hello everyone!",
  sender: "john_doe",
  recipient: "general_chat",
  type: "text",
  priority: "normal",
});

// Get unread messages for a user
const unreadMessages = await findRecords("messages", {
  recipient: "john_doe",
  status: "unread",
});

// Mark messages as read
await updateManyRecords(
  "messages",
  { recipient: "john_doe", status: "unread" },
  { status: "read", readAt: new Date().toISOString() },
);

// Get conversation between two users
const conversation = await findRecords("messages", {
  $or: [
    { sender: "john", recipient: "jane" },
    { sender: "jane", recipient: "john" },
  ],
});
```

### 🛒 Simple E-commerce

```typescript
// Add a product
await insertRecord("products", {
  name: "Wireless Headphones",
  price: 99.99,
  category: "electronics",
  inStock: true,
  quantity: 50,
});

// Get products in a category
const electronics = await findRecords("products", {
  category: "electronics",
  inStock: true,
});

// Get products in price range
const affordableProducts = await findRecords("products", {
  price: { $gte: 10, $lte: 100 },
  inStock: true,
});

// Update stock after purchase
await updateRecord(
  "products",
  { id: 123 },
  {
    quantity: 49,
    updatedAt: new Date().toISOString(),
  },
);
```

### 👤 User Management

```typescript
// Register a new user
const newUser = await insertRecord("users", {
  username: "john_doe",
  email: "john@example.com",
  role: "user",
  active: true,
});

// Find user by email
const user = await findOneRecord("users", {
  email: "john@example.com",
});

// Get all active admin users
const admins = await findRecords("users", {
  role: "admin",
  active: true,
});

// Deactivate user
await updateRecord(
  "users",
  { id: 123 },
  { active: false, deactivatedAt: new Date().toISOString() },
);
```

## 🚨 Common Mistakes & Solutions

### ❌ Wrong: Using the class directly

```typescript
// DON'T DO THIS
import { db } from "@/database/index";
await db.find("messages"); // This will cause "use server" errors
```

### ✅ Correct: Using server actions

```typescript
// DO THIS INSTEAD
import { findRecords } from "@/database/actions";
await findRecords("messages");
```

### ❌ Wrong: Forgetting await

```typescript
// DON'T DO THIS
const messages = findRecords("messages"); // Missing await
```

### ✅ Correct: Always use await

```typescript
// DO THIS INSTEAD
const messages = await findRecords("messages");
```

### ❌ Wrong: Mutating returned data

```typescript
// DON'T DO THIS
const messages = await findRecords("messages");
messages[0].status = "read"; // This doesn't save to database
```

### ✅ Correct: Use update functions

```typescript
// DO THIS INSTEAD
await updateRecord("messages", { id: messages[0].id }, { status: "read" });
```

## 📝 Collection Structure

Each record automatically gets these fields:

```typescript
interface DatabaseRecord {
  id?: string | number; // Auto-generated if not provided
  createdAt?: string; // ISO timestamp when created
  updatedAt?: string; // ISO timestamp when last updated
  [key: string]: unknown; // Your custom fields
}
```

## 🔒 Type Safety

For better TypeScript support, define your data types:

```typescript
interface Message {
  id: number;
  content: string;
  sender: string;
  status: "read" | "unread";
  createdAt: string;
  updatedAt: string;
}

// Use with type assertion
const messages = (await findRecords("messages")) as Message[];
```

## ⚡ Performance Tips

1. **Use specific filters** instead of getting all records and filtering in JavaScript
2. **Use `findOneRecord`** when you only need one record
3. **Use `countRecords`** when you only need the count, not the actual data
4. **Avoid deep nesting** in your JSON files
5. **Keep collections reasonably sized** (under 10,000 records per file)

## 🐛 Troubleshooting

### File Not Found Error

```
Error: ENOENT: no such file or directory, open '.../messages.json'
```

**Solution**: The collection file doesn't exist. It will be created automatically when you insert the first record.

### "use server" Error

```
Error: A "use server" file can only export async functions, found object.
```

**Solution**: Always import from `@/database/actions`, never from `@/database/index`.

### Invalid JSON Error

```
Error: Unexpected token in JSON
```

**Solution**: The JSON file is corrupted. Check the file manually or restore from backup.

## 🎉 You're Ready!

You now know how to use the JSON database system! Start with simple `findRecords` and `insertRecord` operations, then gradually use more advanced features as you need them.

Remember: Always use the functions from `@/database/actions` in your Next.js app!
