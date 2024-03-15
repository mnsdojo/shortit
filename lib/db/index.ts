import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/lib/env.mjs";
import { shortUrl } from "./schema";

export const sql = neon(env.DATABASE_URL);
export const db = drizzle(sql as any, { schema: { ...shortUrl } });
