import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { recordingTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const { user: ID } = params;

	const recordings = await db
		.select({ id: recordingTable.id, date: recordingTable.date })
		.from(recordingTable)
		.where(eq(recordingTable.participant, ID));

	return {
		recordings: recordings.sort((a, b) => b.date.getTime() - a.date.getTime())
	};
};
