DO $$ BEGIN
 CREATE TYPE "public"."taskStatus" AS ENUM('todo', 'in-progress', 'done');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bucket_lists_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"creator_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "participants_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"bucket_list_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"bucket_list_id" integer NOT NULL,
	"description" text NOT NULL,
	"assigned_to" integer NOT NULL,
	"taskStatus" "taskStatus",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" timestamp,
	"image" text,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bucket_lists_table" ADD CONSTRAINT "bucket_lists_table_creator_id_users_table_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participants_table" ADD CONSTRAINT "participants_table_bucket_list_id_bucket_lists_table_id_fk" FOREIGN KEY ("bucket_list_id") REFERENCES "public"."bucket_lists_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participants_table" ADD CONSTRAINT "participants_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks_table" ADD CONSTRAINT "tasks_table_bucket_list_id_bucket_lists_table_id_fk" FOREIGN KEY ("bucket_list_id") REFERENCES "public"."bucket_lists_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks_table" ADD CONSTRAINT "tasks_table_assigned_to_users_table_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
