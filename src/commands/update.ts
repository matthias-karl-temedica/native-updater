import { Command, flags } from "@oclif/command";
import { config } from "..";
import { getFiles } from "../application/get-files";
import { checkVersion } from "../application/read-file";
import { updateVersion } from "../application/update";
const replace = require("replace-in-file");
import * as inquirer from "inquirer";

export default class UpdateVersion extends Command {
  static description =
    "Updates the version number in pbxproj and build.gradle files according to provided semver";

  static examples = [`$ native-updater update major`];

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [
    {
      name: "semver",
      options: ["major", "minor", "patch"],
      hidden: false,
      description: "semver",
    },
  ];

  async run() {
    const { args, flags } = this.parse(UpdateVersion);
    let semver = args.semver;
    if (!semver) {
      let responses: any = await inquirer.prompt([
        {
          name: "semver",
          message: "select a semver",
          type: "list",
          choices: [{ name: "major" }, { name: "minor" }, { name: "patch" }],
        },
      ]);
      semver = responses.semver;
    }

    for (let [os, { key, fileName }] of Object.entries(config)) {
      const file = await getFiles(".", fileName);

      if (!file) {
        throw new Error("File not found");
      }

      const version = await checkVersion(file, key);
      const newVersion = await updateVersion(version, semver);

      const options = {
        files: file,
        from: new RegExp(version, "g"),
        to: newVersion,
      };

      try {
        await replace(options);
        this.log(`${os}: ${newVersion}`);
      } catch (error) {
        this.error("Error occurred:", error);
      }
    }
  }
}
