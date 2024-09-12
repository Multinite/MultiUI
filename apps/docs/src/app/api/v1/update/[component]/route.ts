import { eq } from "drizzle-orm";
import { db } from "../../../../../db";
import { err, ok, safeTry } from "neverthrow";
import { component } from "../../../../../db/schema";

export async function GET(
  request: Request,
  { params }: { params: { component: string } }
) {
  console.log(`Checking github data for ${params.component}`);

  const url = new URL(request.url);
  const framework = url.searchParams.get("framework") || "react";

  const res = await safeTry(async function* () {
    const dbresult = (yield* (
      await getComponent(params.component)
    ).safeUnwrap())[0]!;

    const git_url = `https://raw.githubusercontent.com/${dbresult.github_repo_owner}/${dbresult.github_repo_name}/main/packages/${framework}/component.json`;

    const data = yield* (await getGithubData(git_url)).safeUnwrap();
    delete data["$schema"];

    return ok({ data, dbresult });
  });

  if (res.isErr()) {
    return Response.json({
      success: false,
      error: res.error.message ?? res.error,
    });
  } else {
    return Response.json({
      success: true,
      data: {
        component_json: res.value.data,
        component_data: res.value.dbresult,
      },
    });
  }
}

async function getComponent(component_name: string) {
  try {
    const r = await db
      .select()
      .from(component)
      .where(eq(component.name, component_name))
      .limit(1);

    return ok(r);
  } catch (error: any) {
    return err(error);
  }
}

async function getGithubData(git_url: string) {
  try {
    const r = await fetch(git_url);
    const data = await r.json();
    console.log(data);
    return ok(data);
  } catch (error: any) {
    return err(error);
  }
}
