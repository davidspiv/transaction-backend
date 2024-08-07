import { readFile } from 'node:fs/promises';
import Database from 'better-sqlite3';

const getData = async (fileName: string) => {
	const contents = await readFile(fileName, {
		encoding: 'utf8',
	});
	return contents;
};

function execDbTransaction(queries: string[]) {
	const db = new Database('accounting.db');
	const enterQueries = db.transaction(() => {
		for (const query of queries) {
			db.prepare(query).run();
		}
	});
	enterQueries();
	db.close();
}

export { getData, execDbTransaction };
