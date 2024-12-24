import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { participantTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ params }) => {
	const { user: ID } = params;

	const [user] = await db.select().from(participantTable).where(eq(participantTable.id, ID));

	return {
		user
	};
};
