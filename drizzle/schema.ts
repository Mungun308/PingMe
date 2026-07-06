import { pgTable, unique, text, integer, date, jsonb, timestamp, foreignKey, varchar, boolean, pgSequence } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


export const userIdSeq = pgSequence("user_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "9223372036854775807", cache: "1", cycle: false })

export const users = pgTable("users", {
	email: text().notNull(),
	fullName: text("full_name"),
	age: integer(),
	position: text(),
	team: text(),
	birthDate: date("birth_date"),
	avatarUrl: text("avatar_url"),
	education: jsonb().default({}),
	lifestyle: jsonb().default({}),
	personality: jsonb().default({}),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	userId: text("user_id").default(sql`(\'U\'::text || to_char(nextval(\'user_id_seq\'::regclass), \'FM000\'::text))`).primaryKey().notNull(),
}, (table) => [
	unique("users_email_key").on(table.email),
]);

export const questions = pgTable("questions", {
	questionId: varchar("question_id", { length: 50 }).primaryKey().notNull(),
	receiverId: varchar("receiver_id", { length: 50 }),
	context: text(),
	answer: text(),
	isAnswered: boolean("is_answered"),
	askedAt: timestamp("asked_at", { mode: 'string' }),
	answeredAt: timestamp("answered_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.receiverId],
			foreignColumns: [users.userId],
			name: "fk_questions_receiver"
		}),
]);
