import { Dirent } from "fs";

const fs = require("fs");
const readline = require("readline");
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

async function checkVersion(inputPath: string, key: string) {
  const file = await getFiles(".", inputPath);
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    if (line.includes(key)) {
      const version = line
        .trim()
        .replace("=", "")
        .split(" ")
        .filter((char: string) => !!char)[1]
        .replaceAll('"', "")
        .replaceAll(";", "");

      return version;
    }
  }
}

export { checkVersion };
