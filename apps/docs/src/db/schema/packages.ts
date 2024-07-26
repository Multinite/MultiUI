import { serial, text, datetime, int, varchar } from "drizzle-orm/mysql-core";
import { mysqlTable } from "drizzle-orm/mysql-core/table";

//? `package` is not allowed in strict mode.
const packages = mysqlTable("packages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 35 }).unique().notNull(),
  createdAt: datetime("created_at").default(new Date()).notNull(),
  updatedAt: datetime("updated_at").default(new Date()).notNull(),
  userId: int("user_id").notNull(),
  github_url: varchar("github_url", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  thumbnail_url: varchar("thumbnail_url", { length: 255 }).notNull(),
  likes: int("likes").default(0).notNull(),
  dislikes: int("dislikes").default(0).notNull(),
  downloads: int("downloads").default(0).notNull(),
});

type Packages = typeof packages.$inferSelect;
export type { Packages };
export default packages;
