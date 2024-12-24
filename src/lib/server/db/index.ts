import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const client = new Database('data/local.db');
export const db = drizzle(client);
