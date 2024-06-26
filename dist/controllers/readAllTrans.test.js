import { test } from 'vitest';
import fetch from 'node-fetch';
async function getData(address) {
    const response = await fetch(address);
    const data = await response.json();
    return data;
}
test('@route GET /api/transactions: res formatted correctly', async () => {
    const resBody = await getData('http://localhost:5000/api/transactions/');
    if (typeof resBody !== 'object' || !resBody || !('transactions' in resBody))
        return new Error("@res.body is not an object or doesn't have transactions key.");
    const transArr = resBody.transactions;
    const isArray = Array.isArray(transArr);
    if (!isArray)
        return new Error('@req.transactions is not an array.');
    for (let i = 0; i < transArr.length; i++) {
        const hasEightKeys = Object.keys(transArr[i]).length === 8;
        const isId = 'trans_id' in transArr[i] &&
            typeof transArr[i].trans_id === 'string';
        const isDate = 'trans_date' in transArr[i] &&
            typeof transArr[i].trans_date === 'string';
        const isDateOffset = 'trans_date_offset' in transArr[i] &&
            typeof transArr[i].trans_date_offset === 'number';
        const isAmount = 'trans_amount' in transArr[i] &&
            typeof transArr[i].trans_amount === 'number';
        const isMemo = 'trans_memo' in transArr[i] &&
            typeof transArr[i].trans_memo === 'string';
        const isUserId = 'user_id' in transArr[i] &&
            typeof transArr[i].user_id === 'string';
        const isAccCode = 'acc_code' in transArr[i] &&
            typeof transArr[i].acc_code === 'number';
        if (!hasEightKeys)
            throw new Error(`@transactions elements @index ${i} don't have exactly 8 keys.`);
        if (!isId)
            throw new Error(`@transactions trans_id @index ${i} missing / wrong type.`);
        if (!isDate)
            throw new Error(`@transactions trans_date @index ${i} missing / wrong type.`);
        if (!isDateOffset)
            throw new Error(`@transactions trans_date_offset @index ${i} missing / wrong type.`);
        if (!isAmount)
            throw new Error(`@transactions trans_amount @index ${i} missing / wrong type.`);
        if (!isMemo)
            throw new Error(`@transactions trans_memo @index ${i} missing / wrong type.`);
        if (!isUserId)
            throw new Error(`@transactions user_id @index ${i} missing / wrong type.`);
        if (!isAccCode)
            throw new Error(`@transactions acc_code @index ${i} missing / wrong type.`);
    }
});
