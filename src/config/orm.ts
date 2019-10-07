import { connection } from "./connection";

const selectAll = async ({ table }: { table: string }) => {
  const query: [string, [string]] = ["SELECT * FROM ??", [table]];

  return new Promise((resolve, reject) => {
    // @ts-ignore
    connection.query(...query, (err, res) => {
      if (err) throw err;
      resolve(res);
    });
  });
};

export const orm = {
  selectAll
};
