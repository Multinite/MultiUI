import { serial, varchar, datetime } from "drizzle-orm/mysql-core";
import { mysqlTable } from "drizzle-orm/mysql-core/table";

const user = mysqlTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 35 }).notNull(),
  createdAt: datetime("created_at").default(new Date()).notNull(),
  updatedAt: datetime("updated_at").default(new Date()).notNull(),
});

type User = typeof user.$inferSelect;
export type { User };
export default user;
