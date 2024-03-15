import { pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

export const shortUrl = pgTable("shortUrl", {
  id: varchar("id", { length: 128 }).$defaultFn(() => createId()),
  slug: text("slug").unique(),
  url: text("url").unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
