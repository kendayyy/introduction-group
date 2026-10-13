export function parseRevalidateTags(body: unknown) {
  if (!body || typeof body !== "object" || !("tags" in body)) {
    return null;
  }

  const tags = body.tags;
  if (!Array.isArray(tags) || tags.length === 0) {
    return null;
  }

  if (
    tags.some(
      (tag) => typeof tag !== "string" || tag.length === 0 || tag.length > 256,
    )
  ) {
    return null;
  }

  return tags;
}
