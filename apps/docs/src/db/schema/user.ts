import { serial, text, datetime } from "drizzle-orm/mysql-core";
import { mysqlTable } from "drizzle-orm/mysql-core/table";

const user = mysqlTable("user", {
  id: serial("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  createdAt: datetime("created_at").default(new Date()).notNull(),
  updatedAt: datetime("updated_at").default(new Date()).notNull(),
});

type User = typeof user.$inferSelect;
export type { User };
export default user;
