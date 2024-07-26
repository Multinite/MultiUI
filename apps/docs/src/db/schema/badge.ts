import { serial, varchar, int } from "drizzle-orm/mysql-core";
import { mysqlTable } from "drizzle-orm/mysql-core/table";

const badge = mysqlTable("badge", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 35 }).notNull(),
  packageId: int("package_id").notNull(),
});

type Badge = typeof badge.$inferSelect;
export type { Badge };
export default badge;
