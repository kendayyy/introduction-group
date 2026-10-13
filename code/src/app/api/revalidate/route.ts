import { revalidateTag } from "next/cache";
import { env } from "@/env";
import { parseRevalidateTags } from "@/sanity/revalidate";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  if (
    !env.SANITY_REVALIDATE_SECRET ||
    secret !== env.SANITY_REVALIDATE_SECRET
  ) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const tags = parseRevalidateTags(await request.json().catch(() => null));
  if (!tags) {
    return Response.json({ ok: false }, { status: 400 });
  }

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  return Response.json({ ok: true, tags });
}
