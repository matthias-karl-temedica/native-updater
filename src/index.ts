const config = {
  android: {
    key: "versionName",
    fileName: "build.gradle",
  },
  ios: {
    key: "MARKETING_VERSION",
    fileName: "project.pbxproj",
  },
};

export { config };

export { run } from "@oclif/command";
