import { connection } from "./connection";

/**
 *
 * @description Returns all records in given table
 * @param {{ table: string }} { table } to get data from
 * @returns {Promise<{}[]>}
 */
const selectAll = async ({ table }: { table: string }): Promise<{}[]> => {
  const query: [string, [string]] = ["SELECT * FROM ??", [table]];

  return new Promise((resolve, reject) => {
    // @ts-ignore
    connection.query(...query, (err, res) => {
      if (err) throw err;
      resolve(res);
    });
  });
};

type columnValues = { [k: string]: any };

/**
 *
 * @description Inserts new record into given table with given key:value pairs
 * @param {{
 *   table: string;
 *   values: columnValues;
 * }} {
 *   table,
 *   values
 * }
 * @returns {Promise<void>}
 */
const insertOne = async ({
  table,
  values
}: {
  table: string;
  values: columnValues;
}): Promise<void> => {
  const query = ["INSERT INTO ?? SET ?", [table, values]];
  console.log(query);
  return new Promise((resolve, reject) => {
    // @ts-ignore
    connection.query(...query, (err, res) => {
      if (err) throw err;
      resolve();
    });
  });
};

/**
 *
 * @description Updates record at given ID with given key:value pairs
 * @param {{
 *   table: string;
 *   values: columnValues;
 *   id: number;
 * }} {
 *   table,
 *   values,
 *   id
 * }
 * @returns {Promise<void>}
 */
const updateOne = async ({
  table,
  values,
  id
}: {
  table: string;
  values: columnValues;
  id: number;
}): Promise<void> => {
  const query = ["UPDATE ?? SET ? WHERE id = ?", [table, values, id]];
  console.log(query);
  return new Promise((resolve, reject) => {
    // @ts-ignore
    connection.query(...query, (err, res) => {
      if (err) throw err;
      resolve();
    });
  });
};

export const orm = {
  selectAll,
  insertOne,
  updateOne
};
