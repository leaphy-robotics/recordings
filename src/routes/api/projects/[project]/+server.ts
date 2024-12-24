import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { participantTable, projectTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params }) => {
	const [project] = await db
		.select({
			id: projectTable.id,
			name: projectTable.name,
			acceptsSubmissions: projectTable.acceptsSubmissions,
			suggestNames: projectTable.suggestNames,
			acceptsNewParticipants: projectTable.acceptsNewParticipants,
			showSubmit: projectTable.showSubmit
		})
		.from(projectTable)
		.where(eq(projectTable.slug, params.project));

	if (!project) {
		return new Response(null, {
			status: 404
		});
	}

	let names: { id: string; name: string }[] | null = null;
	if (project.suggestNames) {
		names = await db
			.select({
				id: participantTable.id,
				name: participantTable.name
			})
			.from(participantTable)
			.where(eq(participantTable.project, project.id));
	}

	return new Response(
		JSON.stringify({
			...project,
			names
		})
	);
};
