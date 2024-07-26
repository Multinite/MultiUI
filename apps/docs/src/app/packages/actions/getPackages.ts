"use server";
import { asc } from "drizzle-orm";
import "server-only";
import { db } from "../../../db";
import { packages } from "../../../db/schema";

//TODO: Cache values.

interface Result_base {
  success: boolean;
}

interface Result_success extends Result_base {
  success: true;
  data: any;
}

interface Result_error extends Result_base {
  success: false;
  error: string;
}

type Result = Result_success | Result_error;

export async function getPackages(): Promise<Result> {
  try {
    const result_packages = await db
      .select({
        id: packages.id,
        name: packages.name,
        description: packages.description,
        likes: packages.likes,
        dislikes: packages.dislikes,
        downloads: packages.downloads,
        thumbnail_url: packages.thumbnail_url,
      })
      .from(packages)
      .orderBy(asc(packages.downloads))
      .limit(10);

    return {
      success: true,
      data: result_packages,
    };
  } catch (error) {
    console.log(`An error occurred while querying the DB for packages:`);
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}
