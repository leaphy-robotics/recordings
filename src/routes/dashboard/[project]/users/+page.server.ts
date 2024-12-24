import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { participantTable, projectTable } from '$lib/server/db/schema';
import { randomUUID } from 'crypto';
import { redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const actions: Actions = {
	async create({ params, request, locals }) {
		const user = await locals.getUser();
		if (!user) throw redirect(302, '/dashboard');

		const [project] = await db
			.select()
			.from(projectTable)
			.where(and(eq(projectTable.id, params.project), eq(projectTable.user, user.sub)));
		if (!project) throw redirect(302, '/dashboard');

		const formData = await request.formData();
		const name = formData.get('name') as string;

		await db.insert(participantTable).values({
			id: randomUUID(),
			name,
			project: params.project
		});
	}
};
