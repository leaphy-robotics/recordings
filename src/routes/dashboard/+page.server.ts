import type { PageServerLoad } from './$types';
import { type Actions, error, redirect } from '@sveltejs/kit';
import { getRedirectURL } from '$lib/server/auth0';
import { db } from '$lib/server/db';
import { projectTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

const DEFAULTS = {
	education: {
		showSubmit: true,
		suggestNames: true
	},
	research: {
		showSubmit: false,
		suggestNames: false
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	const user = await locals.getUser();
	if (!user) throw redirect(302, getRedirectURL());

	const projects = await db
		.select({
			id: projectTable.id,
			purpose: projectTable.purpose,
			name: projectTable.name,
			slug: projectTable.slug
		})
		.from(projectTable)
		.where(eq(projectTable.user, user.sub));

	return {
		projects
	};
};

function assertString(value: unknown, minLength = 0, maxLength = -1) {
	if (typeof value !== 'string') throw error(400, `${value} is not a string`);
	if (value.length < minLength) throw error(400, `${value} is not long enough`);
	if (maxLength > 0 && value.length > maxLength) throw error(400, `${value} is too long`);

	return value;
}

export const actions: Actions = {
	async create({ request, locals }) {
		const user = await locals.getUser();
		if (!user) throw error(403, 'Not logged in');

		const data = await request.formData();

		const name = assertString(data.get('name'), 1, 100);
		const slug = assertString(data.get('slug'), 3, 20);
		const purpose = assertString(data.get('purpose')) as 'education' | 'research';

		if (!['education', 'research'].includes(purpose)) throw error(400, 'Invalid purpose');

		const id = randomUUID();
		const preset = DEFAULTS[purpose];

		await db.insert(projectTable).values({
			id,
			name,
			slug,
			user: user.sub,
			purpose,

			acceptsSubmissions: true,
			acceptsNewParticipants: true,
			...preset
		});

		throw redirect(302, `/dashboard/${id}`);
	}
};
