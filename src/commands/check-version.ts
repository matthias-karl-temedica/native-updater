import { Command, flags } from "@oclif/command";
import { ANDROID_FILE, ANDROID_KEY, IOS_FILE, IOS_KEY } from "..";
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
    const { args, flags } = this.parse(CheckVersion);

    const androidVersion = await checkVersion(ANDROID_FILE, ANDROID_KEY);
    const iosVersion = await checkVersion(IOS_FILE, IOS_KEY);

    console.log({ androidVersion, iosVersion });
  }
}
