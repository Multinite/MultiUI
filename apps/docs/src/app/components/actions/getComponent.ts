"use server";
import { asc } from "drizzle-orm";
import "server-only";
import { db } from "../../../db";
import { component } from "../../../db/schema";

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

export async function getComponent(): Promise<Result> {
  try {
    const res_component = await db
      .select()
      .from(component)
      .orderBy(asc(component.downloads))
      .limit(10);

    return {
      success: true,
      data: res_component,
    };
  } catch (error) {
    console.log(`An error occurred while querying the DB for component:`);
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}
