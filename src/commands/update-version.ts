import { Command, flags } from "@oclif/command";
import { ANDROID_FILE, ANDROID_KEY, IOS_FILE, IOS_KEY } from "..";
import { checkVersion } from "../application/read-file";
import { updateVersion } from "../application/update";
const replace = require("replace-in-file");

export default class UpdateVersion extends Command {
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

  static args = [{ name: "newversion" }];

  async run() {
    const { args, flags } = this.parse(UpdateVersion);

    const androidVersion = await checkVersion(ANDROID_FILE, ANDROID_KEY);
    const iosVersion = await checkVersion(IOS_FILE, IOS_KEY);

    for (let { version, file } of [
      { version: androidVersion, file: ANDROID_FILE },
      { version: iosVersion, file: IOS_FILE },
    ]) {
      const newVersion = await updateVersion(version, args.newversion);

      const options = {
        files: file,
        from: new RegExp(version, "g"),
        to: newVersion,
      };

      try {
        const results = await replace(options);
        this.log("Replacement results:", results);
      } catch (error) {
        this.error("Error occurred:", error);
      }
    }
  }
}
