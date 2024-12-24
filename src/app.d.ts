// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	interface User {
		picture: string;
		email: string;
		sub: string;
	}

	namespace App {
		interface Locals {
			getUser(): Promise<User | null>;
		}
	}
}

export {};
