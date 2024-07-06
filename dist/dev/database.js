import { getData } from "./utils.js";
import Database from "better-sqlite3";
const db = new Database("accounting.db");
const queryArr = await getQueries("./dist/dev/up_migration.sql");
// const transArr = await parseCsv(1001);
runQueries(queryArr);
// runTransQueries(transArr);
// db.close();
// console.log(`
// ${queryArr.length} initial query(ies) ran successfully.
// ${transArr.length} transactions input successfully.
// `);
async function getQueries(filePath) {
    const data = await getData(filePath);
    if (!data)
        return [];
    const queryArr = data.split(/(?<=;)/g);
    queryArr.pop();
    return queryArr;
}
function runQueries(queries) {
    const enterQueries = db.transaction(() => {
        for (const query of queries) {
            db.prepare(query).run();
        }
    });
    enterQueries();
}
// function runTransQueries(transArr: Transaction[]) {
// 	const insertStatement = db.prepare(`
// 	INSERT INTO
// 		transactions (trans_id, trans_date, trans_date_offset, trans_amount, trans_memo, user_id, acc_code)
// 	VALUES
// 		(@id, @date, @dateOffset, @amount, @memo, @userId, @accCode);
// 		`);
// 	const enterTrans = db.transaction(() => {
// 		for (const trans of transArr) {
// 			//better-sql-3 will reject a class instance
// 			insertStatement.run({...trans});
// 		}
// 	});
// 	enterTrans();
// }
