import express from 'express';
import setupSocketServer from './src/socket.server';
import { handler } from './build/handler.js';

const app = express();
const server = app.listen(3000);

app.use(handler);
setupSocketServer(server);

console.log('App running on port 3000');
