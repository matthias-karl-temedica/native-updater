const fs = require("fs");
const readline = require("readline");

async function checkVersion(inputPath: string, key: string) {
  const fileStream = fs.createReadStream(inputPath);

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
        .filter((char) => !!char)[1]
        .replaceAll('"', "")
        .replaceAll(";", "");

      return version;
    }
  }
}

export { checkVersion };
