import { env } from '$env/dynamic/private';
import { importJWK, type KeyLike } from 'jose';

const { AUTH0_CLIENT_ID, AUTH0_ISSUER, ORIGIN } = env;
let CACHE_KEY: KeyLike | Uint8Array | null = null;

export async function getKey() {
	if (CACHE_KEY) return CACHE_KEY;

	const jwk = await fetch(`${AUTH0_ISSUER}/.well-known/jwks.json`).then((res) => res.json());

	CACHE_KEY = await importJWK(jwk.keys[0]);
	return CACHE_KEY;
}

export function getRedirectURL() {
	const query = new URLSearchParams({
		scope: 'openid profile email',
		response_type: 'code',
		client_id: AUTH0_CLIENT_ID,
		redirect_uri: `${ORIGIN}/callback`
	});

	return `${AUTH0_ISSUER}/authorize?${query.toString()}`;
}
