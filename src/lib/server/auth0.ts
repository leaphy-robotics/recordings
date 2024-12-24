import { JwksClient } from 'jwks-rsa';
import { AUTH0_CLIENT_ID, AUTH0_ISSUER, ORIGIN } from '$env/static/private';
import { randomBytes } from 'crypto';
import { redirect } from '@sveltejs/kit';
import { importJWK, type KeyLike } from 'jose';

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
