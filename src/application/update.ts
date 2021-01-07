function updateVersion(
  version: string,
  newversion: "major" | "minor" | "patch" | string
): string {
  const [major, minor, patch] = version.split(".");
  switch (newversion) {
    case "major":
      return `${Number(major) + 1}.0.0`;
    case "minor":
      return `${major}.${Number(minor) + 1}.0`;
    case "patch":
      return `${major}.${minor}.${Number(patch) + 1}`;
    default:
      return newversion;
  }
}

export { updateVersion };
