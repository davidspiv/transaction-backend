import Database from 'better-sqlite3';
import { removeDbPrefix, snakeToCamel } from '../../dev/snakeToCamel.js';

import type { Reference, Reference_Data } from '../types.js';

export default (timeInput = 'all', accInput = 'all', limitInput = 0) => {
	const getMostRecentDate = () => {
		const recentRefStatement = `
    SELECT ref_date
    FROM refs
    ORDER BY ref_date
    DESC LIMIT 1;
    `;
		try {
			const db = new Database('accounting.db', {
				fileMustExist: true,
				readonly: true,
			});
			const recentRef = <[{ ref_date: string }] | []>(
				db.prepare(recentRefStatement).all()
			);
			db.close();
			return recentRef[0] ? recentRef[0].ref_date : new Date().toISOString();
		} catch (error) {
			return new Date().toISOString();
		}
	};

	const targetDate = getMostRecentDate();

	const getTimeRange = () => {
		switch (timeInput) {
			case 'day':
				return `ref_date > date('${targetDate}')`;
			case 'week':
				return `ref_date > date('${targetDate}', '-6 day')`;
			case 'month':
				return `ref_date > date('${targetDate}', '-29 day')`;
			case 'year-to-date':
				return `ref_date > date('${targetDate}', '-364 day')`;
			case 'year':
				return `ref_date > date('${targetDate}', '-364 day')`;
			default:
				return '';
		}
	};

	const getAccRange = () => {
		switch (accInput) {
			case 'asset':
				return 'acc_id < 2000';
			case 'liability':
				return 'acc_id > 2000 AND acc_id < 3000';
			case 'equity':
				return 'acc_id > 3000 AND acc_id < 4000';
			case 'revenue':
				return 'acc_id > 4000 AND acc_id < 5000';
			case 'expense':
				return 'acc_id > 5000 AND acc_id < 6000';
			default:
				return '';
		}
	};

	const getLimit = () => {
		if (limitInput) {
			return ` LIMIT ${limitInput}`;
		}
		return '';
	};

	const baseStatement = 'SELECT * FROM refs';

	const timeRange = getTimeRange();
	const accRange = getAccRange();
	const limit = getLimit();

	const whereConnector = timeRange.length || accRange.length ? ' WHERE ' : ' ';
	const andConnector = timeRange.length && accRange.length ? ' AND ' : ' ';

	const selectStatement = baseStatement.concat(
		whereConnector,
		timeRange,
		andConnector,
		accRange,
		' ORDER BY ref_date DESC',
		limit,
		';',
	);

	const db = new Database('accounting.db', {
		fileMustExist: true,
		readonly: true,
	});
	const resultArr = db.prepare(selectStatement).all();

	db.close();

	// for (const resultEl of resultArr) {
	// 	const obj = resultEl as Record<string, string | number | null>;
	// 	const keys = Object.keys(obj);
	// 	for (const key of keys) {
	// 		const newKey = snakeToCamel(removeDbPrefix(key));

	// 		delete Object.assign(obj, { [newKey]: obj[key] })[key];
	// 	}
	// 	if (!isRef(obj)) {
	// 		return new Error('[DATABASE] references formatted incorrectly');
	// 	}
	// }

	const refArr: Reference[] = [];

	for (const resultEl of resultArr) {
		if (!isRef(resultEl)) return new Error('Internal database issue');

		const reference: Reference = {
			id: resultEl.ref_id,
			date: resultEl.ref_date,
			dateOffset: resultEl.ref_date_offset,
			memo: resultEl.ref_memo,
			amount: resultEl.ref_amount,
			srcId: resultEl.src_id,
			fitid: resultEl.ref_fitid,
		};

		refArr.push(reference);
	}

	return refArr;
};

function isRef(obj: unknown): obj is Reference_Data {
	return (
		(obj as Reference_Data)?.ref_id !== undefined &&
		(obj as Reference_Data)?.ref_date !== undefined &&
		(obj as Reference_Data)?.ref_date_offset !== undefined &&
		(obj as Reference_Data)?.ref_memo !== undefined &&
		(obj as Reference_Data)?.ref_amount !== undefined &&
		(obj as Reference_Data)?.src_id !== undefined
	);
}
