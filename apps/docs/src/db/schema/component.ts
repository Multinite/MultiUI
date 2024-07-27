import { serial, text, datetime, int, varchar } from "drizzle-orm/mysql-core";
import { mysqlTable } from "drizzle-orm/mysql-core/table";

//? `package` is not allowed in strict mode.
const component = mysqlTable("component", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 35 }).unique().notNull(),
  version: varchar("version", { length: 10 }).notNull(),
  createdAt: datetime("created_at").default(new Date()).notNull(),
  updatedAt: datetime("updated_at").default(new Date()).notNull(),
  userId: int("user_id").notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  thumbnail_url: varchar("thumbnail_url", { length: 255 }).notNull(),
  likes: int("likes").default(0).notNull(),
  dislikes: int("dislikes").default(0).notNull(),
  downloads: int("downloads").default(0).notNull(),
  github_url: varchar("github_url", { length: 255 }).notNull(),
  github_repo_name: varchar("github_repo_name", { length: 100 }).notNull(),
  github_repo_owner: varchar("github_repo_owner", { length: 100 }).notNull(),
});

type Component = typeof component.$inferSelect;
export type { Component };
export default component;
