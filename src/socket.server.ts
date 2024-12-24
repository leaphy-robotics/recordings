import type { HttpServer } from 'vite';
import { Server } from 'socket.io';
import { db } from './lib/server/db';
import {
	participantTable,
	type Project,
	projectTable,
	recordingTable
} from './lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { appendFile, mkdtemp, readFile, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { gzip } from 'zlib';

async function getUser(project: Project, username: string | string[] | undefined) {
	if (typeof username !== 'string' || username.length < 3)
		throw new Error('PROJECT_INVALID_USERNAME');

	const [user] = await db
		.select()
		.from(participantTable)
		.where(and(eq(participantTable.name, username), eq(participantTable.project, project.id)));
	let userID = user?.id || randomUUID();

	if (!user) {
		if (!project.acceptsNewParticipants) throw new Error('PROJECT_NO_OTHER_PARTICIPANTS');

		await db.insert(participantTable).values({
			id: userID,
			project: project.id,
			name: username
		});
	}

	return userID;
}

async function getProject(projectId: string | string[] | undefined) {
	if (typeof projectId !== 'string') throw new Error('INVALID_PROJECT');

	const [project] = await db.select().from(projectTable).where(eq(projectTable.id, projectId));

	if (!project) throw new Error('INVALID_PROJECT');
	if (!project.acceptsSubmissions) throw new Error('PROJECT_SUBMISSIONS_CLOSED');

	return project;
}

export default function setupSocketServer(server: HttpServer) {
	const io = new Server(server, {
		cors: {
			origin: '*'
		}
	});

	io.on('connection', async (socket) => {
		let project: Project, user: string;
		try {
			project = await getProject(socket.request.headers['project']);
			user = await getUser(project, socket.request.headers['name']);
		} catch (e) {
			socket.emit('error', (e as Error)?.message || null);
			socket.disconnect();
			return;
		}

		const dir = await mkdtemp(join(tmpdir(), 'recording-'));
		const file = `${dir}/recording.txt`;
		await writeFile(file, '');

		socket.on('write', async ({ data }) => {
			await appendFile(file, data);
		});

		socket.on('disconnect', async () => {
			const data = await readFile(file, 'utf-8');
			const value = data
				.split('\n')
				.map((e) => {
					try {
						return JSON.parse(e);
					} catch {
						return null;
					}
				})
				.filter((e) => e);

			const zip = await new Promise<Buffer>((resolve) =>
				gzip(JSON.stringify(value), (_e, v) => resolve(v))
			);

			console.log(user);
			await db.insert(recordingTable).values({
				id: randomUUID(),
				date: new Date(),
				participant: user,
				recording: zip.toString('base64')
			});

			await rm(dir, { recursive: true });
		});
	});
}
