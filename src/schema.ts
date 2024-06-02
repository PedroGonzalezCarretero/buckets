import {
   boolean,
   integer,
   pgTable,
   serial,
   text,
   timestamp
} from 'drizzle-orm/pg-core';

// Define the users table
export const usersTable = pgTable('users_table', {
   id: serial('id').primaryKey(),
   name: text('name').notNull(),
   email: text('email').notNull().unique(),
   emailVerified: timestamp('email_verified', { mode: 'date' }),
   image: text('image')
});

// Define the bucket lists table
export const bucketListsTable = pgTable('bucket_lists_table', {
   id: serial('id').primaryKey(),
   name: text('name').notNull(),
   creatorId: integer('creator_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
   createdAt: timestamp('created_at').notNull().defaultNow(),
   updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdate(() => new Date())
});

// Define the tasks table
export const tasksTable = pgTable('tasks_table', {
   id: serial('id').primaryKey(),
   bucketListId: integer('bucket_list_id')
      .notNull()
      .references(() => bucketListsTable.id, { onDelete: 'cascade' }),
   description: text('description').notNull(),
   assignedTo: integer('assigned_to')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
   completed: boolean('completed').notNull().default(false),
   createdAt: timestamp('created_at').notNull().defaultNow(),
   updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdate(() => new Date())
});

// Define the participants table
export const participantsTable = pgTable('participants_table', {
   id: serial('id').primaryKey(),
   bucketListId: integer('bucket_list_id')
      .notNull()
      .references(() => bucketListsTable.id, { onDelete: 'cascade' }),
   userId: integer('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
   joinedAt: timestamp('joined_at').notNull().defaultNow()
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertBucketList = typeof bucketListsTable.$inferInsert;
export type SelectBucketList = typeof bucketListsTable.$inferSelect;

export type InsertTask = typeof tasksTable.$inferInsert;
export type SelectTask = typeof tasksTable.$inferSelect;

export type InsertParticipant = typeof participantsTable.$inferInsert;
export type SelectParticipant = typeof participantsTable.$inferSelect;
