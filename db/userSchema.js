import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { companySchema } from "./companySchema.js";

export const userSchema = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    first_name: varchar('first_name', { length: 50 }).notNull(),
    last_name: varchar('last_name', { length: 50 }).notNull(),
    email: varchar('email', { length: 50 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    role: varchar('role', { length: 50 }).notNull().default('user'),
    company_id: uuid().references(() => companySchema.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})