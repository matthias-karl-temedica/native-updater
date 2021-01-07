import { Command, flags } from "@oclif/command";
import { config } from "..";
import { getFiles } from "../application/get-files";
import { checkVersion } from "../application/read-file";

export default class CheckVersion extends Command {
  static description =
    "Outputs the current version from pbxproj and build.gradle";

  static examples = [`$ native-updater check`];

  static flags = {
    help: flags.help({ char: "h" }),
  };

  async run() {
    this.parse(CheckVersion);

    let versions: Array<string> = [];
    for (let [os, { key, fileName }] of Object.entries(config)) {
      const file = await getFiles(".", fileName);

      if (!file) {
        throw new Error("File not found");
      }

      const version = await checkVersion(file, key);
      versions.push(version);
      this.log(`${os}: ${version}`);
    }

    if (!versions.every((version) => version === versions[0])) {
      this.error("Versions are out of sync");
    }
  }
}
