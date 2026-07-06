-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE SEQUENCE "public"."user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE TABLE "users" (
	"email" text NOT NULL,
	"full_name" text,
	"age" integer,
	"position" text,
	"team" text,
	"birth_date" date,
	"avatar_url" text,
	"education" jsonb DEFAULT '{}'::jsonb,
	"lifestyle" jsonb DEFAULT '{}'::jsonb,
	"personality" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now(),
	"user_id" text PRIMARY KEY DEFAULT ('U'::text || to_char(nextval('user_id_seq'::regclass), 'FM000'::text)) NOT NULL,
	CONSTRAINT "users_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"question_id" varchar(50) PRIMARY KEY NOT NULL,
	"receiver_id" varchar(50),
	"context" text,
	"answer" text,
	"is_answered" boolean,
	"asked_at" timestamp,
	"answered_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "fk_questions_receiver" FOREIGN KEY ("receiver_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
*/