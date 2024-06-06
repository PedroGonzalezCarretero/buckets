DO $$ BEGIN
 CREATE TYPE "public"."taskStatus" AS ENUM('todo', 'in-progress', 'done');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "tasks_table" ADD COLUMN "taskStatus" "taskStatus";--> statement-breakpoint
ALTER TABLE "tasks_table" DROP COLUMN IF EXISTS "status";