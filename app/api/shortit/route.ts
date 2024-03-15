import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { shortUrl } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const urlschema = z.object({
  slug: z
    .string({
      description: "The slug for the URL",
      invalid_type_error: "Invalid slug",
      required_error: "Slug is required",
    })
    .optional(),
  url: z.string().url({ message: "Invalid URL" }),
});
export async function POST(req: Request) {
  const body = await req.json();
  const parsed = urlschema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.errors[0].message },
      { status: 400 }
    );
  }
  const { url, slug } = parsed.data;

  if (slug) {
    const alreadyExist = await db
      .select()
      .from(shortUrl)
      .where(eq(shortUrl.slug, slug.toLowerCase()))
      .execute();
    if (alreadyExist.length > 0) {
      return NextResponse.json(
        { message: "Slug Already exist" },
        { status: 409 }
      );
    }
  }
  const newSlug = slug ? slug.toLowerCase() : nanoid();
  const shortenedUrl = await db
    .insert(shortUrl)
    .values({ slug: newSlug, url })
    .returning({ slug: shortUrl.slug });
  return NextResponse.json(shortenedUrl[0], { status: 201 });
}
