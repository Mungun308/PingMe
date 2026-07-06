import { relations } from "drizzle-orm/relations";
import { users, questions } from "./schema";

export const questionsRelations = relations(questions, ({one}) => ({
	user: one(users, {
		fields: [questions.receiverId],
		references: [users.userId]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	questions: many(questions),
}));