import {
   boolean,
   integer,
   pgTable,
   serial,
   text,
   timestamp
} from 'drizzle-orm/pg-core';

// Define the users table
export const users = pgTable('users_table', {
   id: serial('id').primaryKey(),
   name: text('name').notNull(),
   email: text('email').notNull().unique(),
   emailVerified: timestamp('email_verified', { mode: 'date' }),
   image: text('image')
});

// Define the bucket lists table
export const bucketList = pgTable('bucket_lists_table', {
   id: serial('id').primaryKey(),
   name: text('name').notNull(),
   description: text('description'),
   creatorId: integer('creator_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
   createdAt: timestamp('created_at').notNull().defaultNow(),
   updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
});

// Define the tasks table
export const tasks = pgTable('tasks_table', {
   id: serial('id').primaryKey(),
   bucketListId: integer('bucket_list_id')
      .notNull()
      .references(() => bucketList.id, { onDelete: 'cascade' }),
   description: text('description').notNull(),
   assignedTo: integer('assigned_to')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
   completed: boolean('completed').notNull().default(false),
   createdAt: timestamp('created_at').notNull().defaultNow(),
   updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
});

// Define the participants table
export const participants = pgTable('participants_table', {
   id: serial('id').primaryKey(),
   bucketListId: integer('bucket_list_id')
      .notNull()
      .references(() => bucketList.id, { onDelete: 'cascade' }),
   userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
   joinedAt: timestamp('joined_at').notNull().defaultNow()
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertBucketList = typeof bucketList.$inferInsert;
export type SelectBucketList = typeof bucketList.$inferSelect;

export type InsertTask = typeof tasks.$inferInsert;
export type SelectTask = typeof tasks.$inferSelect;

export type InsertParticipant = typeof participants.$inferInsert;
export type SelectParticipant = typeof participants.$inferSelect;
