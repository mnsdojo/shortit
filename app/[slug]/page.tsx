import React from "react";

import { db } from "@/lib/db";
import { shortUrl } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
interface Props {
  params: {
    slug: string;
  };
}
async function Page(props: Props) {
  const url = await db
    .select()
    .from(shortUrl)
    .where(eq(shortUrl.slug, props.params.slug.toLowerCase()))
    .limit(1)
    .execute();
  if (!url) return redirect("/");

  return <div>Redirecting..</div>;
}

export default Page;
