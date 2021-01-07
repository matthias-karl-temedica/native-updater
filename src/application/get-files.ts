import { Dirent } from "fs";

const { resolve } = require("path");
const { readdir } = require("fs").promises;
var parent = require("parent-package-json");

async function getFiles(dir: string, search: string) {
  const dirents: Dirent[] = await readdir(dir, { withFileTypes: true });
  const files: Array<string> = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res, search) : res;
    })
  );

  let searchName = search;
  if (search === "project.pbxproj") {
    const { name } = require(`${process.cwd()}/package.json`);
    searchName = `${name}.xcodeproj/${search}`;
  }

  return files.flat().find((file) => file?.includes(searchName));
}

export { getFiles };
