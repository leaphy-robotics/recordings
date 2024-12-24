import { type PluginOption } from 'vite';
import setupSocketServer from './src/socket.server';

export default {
	name: 'socketVitePlugin',
	configureServer(server) {
		if (!server.httpServer) {
			console.log('Oh no, the required http server was not found.');
			return;
		}

		setupSocketServer(server.httpServer);
	}
} satisfies PluginOption;
