const config = {
  ios: {
    key: "MARKETING_VERSION",
    fileName: "project.pbxproj",
  },
  android: {
    key: "versionName",
    fileName: "build.gradle",
  },
};

export { config };

export { run } from "@oclif/command";
