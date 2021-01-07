import { Command, flags } from "@oclif/command";
import { config } from "..";
import { getFiles } from "../application/get-files";
import { checkVersion } from "../application/read-file";
import { updateVersion } from "../application/update";
const replace = require("replace-in-file");
import * as inquirer from "inquirer";

const semverRegex = /(?<=^v?|\sv?)(?:(?:0|[1-9]\d*)\.){2}(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*)(?:\.(?:0|[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*))*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?\b/gi;

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
      // options: ["major", "minor", "patch"],
      hidden: false,
      description: "(major|minor|patch|<Number>) semver",
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

    if (
      !["major", "minor", "patch"].includes(semver) &&
      !semverRegex.test(semver)
    ) {
      throw new Error("Invalid version");
    }

    for await (let [os, { key, fileName }] of Object.entries(config)) {
      const file = await getFiles(".", fileName);

      if (!file) {
        throw new Error("File not found");
      }

      const version = await checkVersion(file, key);
      const newVersion = await updateVersion(version, semver);

      const getRegex = (os: string, key: string, version: string) =>
        os === "ios" ? `${key} = ${version}` : `${key} "${version}"`;

      const options = {
        files: file,
        from: new RegExp(getRegex(os, key, version), "g"),
        to: getRegex(os, key, newVersion),
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
