import {
    pgTable,
    text,
    integer,
    date,
    jsonb,
    timestamp,
    primaryKey,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { sql } from "drizzle-orm";

export const users = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name"),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
        }),
    })
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    });

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
);

export const profiles = pgTable("profiles", {
    userId: text("user_id")
        .primaryKey()
        .default(sql`('U'::text || to_char(nextval('user_id_seq'::regclass), 'FM000'::text))`),
    authUserId: text("auth_user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    fullName: text("full_name"),
    age: integer("age"),
    position: text("position"),
    team: text("team"),
    birthDate: date("birth_date"),
    avatarUrl: text("avatar_url"),
    education: jsonb("education").default({}),
    lifestyle: jsonb("lifestyle").default({}),
    personality: jsonb("personality").default({}),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});


export const questions = pgTable("questions", {
    questionId: text("question_id").primaryKey(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    receiverId: text("receiver_id")
        .notNull()
        .references(() => profiles.userId, { onDelete: "cascade" }),
    context: text("context"),
    answer: text("answer"),
    answeredAt: date("answered_at"),
});