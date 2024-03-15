import { pgTable, unique, varchar, text, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const shortUrl = pgTable("shortUrl", {
	id: varchar("id", { length: 128 }),
	slug: text("slug"),
	url: text("url"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		shortUrlSlugUnique: unique("shortUrl_slug_unique").on(table.slug),
		shortUrlUrlUnique: unique("shortUrl_url_unique").on(table.url),
	}
});