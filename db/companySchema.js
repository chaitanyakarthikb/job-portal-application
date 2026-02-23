import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const companySchema = pgTable('companies', {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar('name', { length: 150 }).notNull(),
    website: varchar('website', { length: 150 }).notNull(),
    description: varchar('description', { length: 150 }).notNull(),
    email: varchar('email', { length: 150 }).notNull().unique(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})