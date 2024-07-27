import { eq } from "drizzle-orm";
import { db } from "../../../../../db";
import { component } from "../../../../../db/schema";
import { Component } from "../../../../../db/schema/component";

export async function GET(
  request: Request,
  { params }: { params: { component: string } }
) {
  try {
    var find_component_ = await db
      .select()
      .from(component)
      .where(eq(component.name, params.component))
      .limit(1);
  } catch (error: any) {
    console.log(`An error occurred while querying the DB for component:`);
    console.error(JSON.parse(JSON.stringify(error)));
    if (error && error.body && error.body.code === "UNKNOWN")
      return Response.json({
        success: false,
        error: "Invalid component",
      });
    return Response.json({
      success: false,
      error: "Something went wrong",
    });
  }

  if (find_component_.length === 0)
    return Response.json({
      success: false,
      error: "Invalid component",
    });

  const find_component = find_component_[0] as Component;

  const git_url = `https://api.github.com/repos/${find_component.github_repo_owner}/${find_component.github_repo_name}/contents/src/component.json`;

  try {
    const res = await fetch(git_url);
    const data = await res.json();
    console.log(data);
    if (!data.content)
      return Response.json({
        success: false,
        error: "Invalid component repository: content is missing",
      });
    const component_info = JSON.parse(atob(data.content));
    delete component_info["$schema"];
    return Response.json({
      data: { ...component_info, info: find_component },
      success: true,
    });
  } catch (err) {
    console.error(err);
    return Response.json({
      success: false,
      error: "Something went wrong",
    });
  }
}
