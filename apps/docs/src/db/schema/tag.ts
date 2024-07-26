import { serial, varchar, int } from "drizzle-orm/mysql-core";
import { mysqlTable } from "drizzle-orm/mysql-core/table";

const tag = mysqlTable("tag", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 35 }).notNull(),
  packageId: int("package_id").notNull(),
});

type Tag = typeof tag.$inferSelect;
export type { Tag };
export default tag;
