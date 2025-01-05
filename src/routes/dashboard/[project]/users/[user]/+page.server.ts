import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { participantTable, recordingTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

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

export const actions: Actions = {
	async delete({ params, request, locals }) {
		const user = await locals.getUser();
		if (!user) throw redirect(302, '/dashboard');

		await db.delete(participantTable).where(eq(participantTable.id, params.user));
		redirect(302, '/dashboard/' + params.project + '/users');
	}
};
