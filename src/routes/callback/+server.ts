import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

const { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_ISSUER, ORIGIN } = env;

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');

	const res = await fetch(`${AUTH0_ISSUER}/oauth/token`, {
		method: 'POST',
		body: JSON.stringify({
			code,
			client_id: AUTH0_CLIENT_ID,
			client_secret: AUTH0_CLIENT_SECRET,
			redirect_uri: `${ORIGIN}/api/auth/callback`,
			grant_type: 'authorization_code'
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const tokens = await res.json();

	cookies.set('token', tokens.id_token, {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7,
		path: '/'
	});

	return new Response(null, {
		status: 302,
		headers: {
			location: '/dashboard'
		}
	});
};
