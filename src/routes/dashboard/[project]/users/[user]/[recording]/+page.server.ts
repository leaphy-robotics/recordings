import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { recordingTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { gunzip } from 'zlib';

export const load: PageServerLoad = async ({ params }) => {
	const { recording: ID } = params;

	const [data] = await db.select().from(recordingTable).where(eq(recordingTable.id, ID));

	const content = await new Promise<Buffer>((resolve) =>
		gunzip(Buffer.from(data.recording, 'base64').buffer as ArrayBuffer, (_e, buffer) =>
			resolve(buffer)
		)
	);

	return {
		recording: {
			...data,
			recording: content.toString()
		}
	};
};
