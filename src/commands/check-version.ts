import { Command, flags } from "@oclif/command";
import { config } from "..";
import { getFiles } from "../application/get-files";
import { checkVersion } from "../application/read-file";

export default class CheckVersion extends Command {
  static description = "describe the command here";

  static examples = [
    `$ native-updater hello
  hello world from ./src/hello.ts!
  `,
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" }),
  };

  static args = [{ name: "file" }];

  async run() {
    for (let [os, { key, fileName }] of Object.entries(config)) {
      const file = await getFiles(".", fileName);

      if (!file) {
        throw new Error("File not found");
      }

      const version = await checkVersion(file, key);

      console.log(`${os}: ${version}`);
    }
  }
}
