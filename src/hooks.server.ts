import { type Handle, redirect } from '@sveltejs/kit';
import { verify } from '@node-rs/argon2';
import { getKey } from '$lib/server/auth0';
import { jwtVerify } from 'jose';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.request.method === 'OPTIONS') {
		return new Response('ok', {
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		});
	}

	event.locals.getUser = async function () {
		const token = event.cookies.get('token');
		if (!token) return null;

		try {
			const user = await jwtVerify<User>(token, await getKey());
			return user.payload;
		} catch (e) {
			return null;
		}
	};

	const res = await resolve(event);
	res.headers.set('Access-Control-Allow-Origin', '*');

	return res;
};
