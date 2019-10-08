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

type columnValues = { [k: string]: any };

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
