import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { participantTable, projectTable } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { getRedirectURL } from '$lib/server/auth0';
import { and, eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const user = await locals.getUser();
	if (!user) throw redirect(302, getRedirectURL());

	const [project] = await db
		.select()
		.from(projectTable)
		.where(and(eq(projectTable.id, params.project), eq(projectTable.user, user.sub)));

	if (!project) throw redirect(302, '/dashboard');

	const users = await db
		.select()
		.from(participantTable)
		.where(and(eq(participantTable.project, params.project)));

	return {
		projectID: params.project,
		project,
		users
	};
};
