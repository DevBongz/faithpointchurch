// Legacy schema — auth is now managed by Better Auth, app data by Convex.
// This file is kept for compatibility with drizzle.config.ts and any legacy imports.

import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = Omit<User, "id">;
