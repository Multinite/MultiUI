import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".local.env" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_CONNECTION_URL!,
  },
});
