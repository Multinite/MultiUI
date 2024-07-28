import { and, eq } from "drizzle-orm";
import { db } from "../../../../../db";
import { component } from "../../../../../db/schema";
import { Component } from "../../../../../db/schema/component";

export async function GET(
  request: Request,
  { params }: { params: { component: string } }
) {
  const component_name = params.component.split("@")[0]!;
  const component_version = params.component.split("@")[1]!;
  console.log(`Searching for ${component_name}@${component_version}`);
  try {
    var find_component_ = await db
      .select()
      .from(component)
      .where(eq(component.name, component_name))
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

  const git_url = `https://api.github.com/repos/${find_component.github_repo_owner}/${find_component.github_repo_name}/contents/src/component.json${component_version.toLowerCase() === "latest" ? "" : `?ref=${component_version}`}`;

  try {
    const res = await fetch(git_url, {
      next: {
        revalidate: 60 * 60 * 24,
        tags: [
          `${find_component.github_repo_owner}/${find_component.github_repo_name}`,
        ],
      },
    });
    const data = await res.json();
    console.log(data);

    if (data.status) {
      return Response.json({
        success: false,
        error: data.message,
      });
    }
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
