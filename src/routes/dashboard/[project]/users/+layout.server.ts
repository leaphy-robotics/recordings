import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (request) => {
	return {
		path: {
			users: true
		}
	};
};
