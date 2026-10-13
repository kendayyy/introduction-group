import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const path = url.searchParams.get("path") ?? "/vi/preview";

  if (!env.SANITY_PREVIEW_SECRET || secret !== env.SANITY_PREVIEW_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) {
    return new Response("Bad request", { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();
  redirect(path);
}
