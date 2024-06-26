import { readFile } from "node:fs/promises";
import { Transaction } from "../models/classes.js";

const transactions: Transaction[] = [];

const getData = async (fileName: string) => {
  try {
    const contents = await readFile(fileName, {
      encoding: "utf8",
    });
    return contents;
  } catch (err) {
    console.log("Unable to retrieve text from file.");
  }
};

const parseCsv = async (accCode: number) => {
  const csvData = await getData("./test-inputs/debit.csv");

  if (csvData) {
    buildTransObj(csvData);
  } else {
    console.log("Error with getData()");
  }

  return transactions;

  function buildTransObj(data: string) {
    const csvValues = splitCsv(data.replace(/[\n]/g, ","));
    const totalCol = 7;

    let lastDate: string | null = null;
    let dateOffset = 0;

    for (let i = 1; i < Math.floor(csvValues.length / totalCol); i++) {
      const date = new Date(csvValues[i * totalCol]).toISOString();

      if (lastDate === date) {
        dateOffset++;
      } else {
        dateOffset = 0;
        lastDate = date;
      }

      const amount = Math.round(
        Number.parseInt(
          (Number.parseFloat(csvValues[i * totalCol + 5]) * 100).toFixed(2)
        )
      );

      const memo = csvValues[i * totalCol + 1];
      const userId = "David";

      const transObj = new Transaction(
        date,
        dateOffset,
        amount,
        memo,
        userId,
        accCode
      );

      transactions.push(transObj);
    }
  }

  function splitCsv(str: string) {
    const obj: { soFar: string[]; isConcatting: boolean } = {
      soFar: [],
      isConcatting: false,
    };
    return str.split(",").reduce((accum, curr) => {
      if (accum.isConcatting) {
        accum.soFar[accum.soFar.length - 1] += `,${curr}`;
      } else {
        accum.soFar.push(curr);
      }
      if (curr.split('"').length % 2 === 0) {
        accum.isConcatting = !accum.isConcatting;
      }
      return accum;
    }, obj).soFar;
  }
};

const parseOfx = async () => {
  const transactions = [];
  const ofxString = await getData("./inputs/debit.ofx");
  const objectify = (ofxData: string) => {
    const transType = ofxData.slice(
      ofxData.indexOf("<TRNTYPE>") + 9,
      ofxData.indexOf("</TRNTYPE")
    );
    const datePosted = ofxData.slice(
      ofxData.indexOf("<DTPOSTED>") + 10,
      ofxData.indexOf("</DTPOSTED>")
    );
    const dateAvailable = ofxData.slice(
      ofxData.indexOf("<DTAVAIL>") + 9,
      ofxData.indexOf("</DTAVAIL>")
    );
    const amount = ofxData.slice(
      ofxData.indexOf("<TRNAMT>") + 8,
      ofxData.indexOf("</TRNAMT>")
    );
    const fitid = ofxData.slice(
      ofxData.indexOf("<FITID>") + 7,
      ofxData.indexOf("</FITID>")
    );
    const transName = ofxData.slice(
      ofxData.indexOf("<NAME>") + 6,
      ofxData.indexOf("</NAME>")
    );
    const memo = ofxData.slice(
      ofxData.indexOf("<MEMO>") + 6,
      ofxData.indexOf("</MEMO>")
    );

    return { transType, datePosted, amount, memo, fitid };
  };

  if (ofxString) {
    const ofxDataArr = ofxString.split("<STMTTRN>");
    //skip first AND last el
    for (let i = 1; i < ofxDataArr.length - 1; i++) {
      const transaction = objectify(ofxDataArr[i]);
      transactions.push(transaction);
    }
    return transactions;
  }
  console.log("Error with getData()");
};

export { getData, parseCsv, parseOfx };
