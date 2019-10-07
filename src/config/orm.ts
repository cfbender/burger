import { connection } from "./connection";

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

type columnValues = { column: string; value: string }[];

const insertOne = async ({
  table,
  values
}: {
  table: string;
  values: columnValues;
}): Promise<void> => {
  const query: [string, [string, columnValues]] = [
    "INSERT INTO ?? SET ?",
    [table, values]
  ];

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
  insertOne
};
