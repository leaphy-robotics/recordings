import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const projectTable = sqliteTable('project', {
	id: text('id').notNull().primaryKey(),
	name: text('name').notNull(),
	slug: text('slug').unique().notNull(),
	user: text('user').notNull(),
	purpose: text('purpose', { enum: ['education', 'research'] }).notNull(),

	acceptsSubmissions: integer('acceptsSubmissions', { mode: 'boolean' }).notNull(),
	acceptsNewParticipants: integer('acceptsNewUsers', { mode: 'boolean' }).notNull(),
	suggestNames: integer('suggestNames', { mode: 'boolean' }).notNull(),
	showSubmit: integer('showSubmit', { mode: 'boolean' }).notNull()
});

export const participantTable = sqliteTable('participant', {
	id: text('id').notNull().primaryKey(),
	name: text('name').notNull(),
	project: text('project')
		.notNull()
		.references(() => projectTable.id, { onDelete: 'cascade' })
});

export const recordingTable = sqliteTable('recording', {
	id: text('id').notNull(),
	participant: text('participant')
		.notNull()
		.references(() => participantTable.id, { onDelete: 'cascade' }),
	date: integer('date', { mode: 'timestamp' }).notNull(),
	recording: text('recording').notNull()
});

export type Project = typeof projectTable.$inferSelect;
export type Participant = typeof participantTable.$inferSelect;
export type Recording = typeof recordingTable.$inferSelect;
