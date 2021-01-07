import { Dirent } from "fs";

const { resolve } = require("path");
const { readdir } = require("fs").promises;

async function getFiles(dir: string, search: string) {
  const dirents: Dirent[] = await readdir(dir, { withFileTypes: true });
  const files: Array<string> = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res, search) : res;
    })
  );

  return files.flat().find((file) => file?.includes(search));
}

export { getFiles };
