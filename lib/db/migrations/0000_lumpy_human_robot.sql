CREATE TABLE IF NOT EXISTS "shortUrl" (
	"id" varchar(128),
	"slug" text,
	"url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "shortUrl_slug_unique" UNIQUE("slug"),
	CONSTRAINT "shortUrl_url_unique" UNIQUE("url")
);
