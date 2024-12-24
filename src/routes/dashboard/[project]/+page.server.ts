import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { projectTable } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const [project] = await db.select().from(projectTable).where(eq(projectTable.id, params.project));

	return {
		project: project,
		path: {
			settings: true
		}
	};
};

export const actions: Actions = {
	save: async ({ params, locals, request }) => {
		const user = await locals.getUser();
		if (!user) throw redirect(302, '/dashboard');

		const formData = await request.formData();

		const acceptsSubmissions = formData.get('acceptsSubmissions') === 'true';
		const acceptsNewParticipants = formData.get('acceptsNewParticipants') === 'true';
		let suggestNames = formData.get('suggestNames') === 'true';

		if (!acceptsNewParticipants) suggestNames = true;

		await db
			.update(projectTable)
			.set({
				acceptsSubmissions,
				acceptsNewParticipants,
				suggestNames
			})
			.where(and(eq(projectTable.id, params.project), eq(projectTable.user, user.sub)));
	}
};
