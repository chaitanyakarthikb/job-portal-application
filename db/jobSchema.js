import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { companySchema } from "./companySchema.js";

export const jobSchema = pgTable('jobs', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar('title', { length: 50 }).notNull(),
    description: varchar('description', { length: 255 }).notNull(),
    status: varchar('status', { length: 50 }).notNull().default('open'),
    salary: varchar('salary', { length: 50 }).notNull(),
    location: varchar('location', { length: 50 }).notNull(),
    company_id: uuid().references(() => companySchema.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})