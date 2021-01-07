updater
=======



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/updater.svg)](https://npmjs.org/package/updater)
[![Downloads/week](https://img.shields.io/npm/dw/updater.svg)](https://npmjs.org/package/updater)
[![License](https://img.shields.io/npm/l/updater.svg)](https://github.com/matthias-karl-temedica/native-updater/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g native-updater
$ native-updater COMMAND
running command...
$ native-updater (-v|--version|version)
native-updater/1.0.5 darwin-x64 node-v15.3.0
$ native-updater --help [COMMAND]
USAGE
  $ native-updater COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`native-updater check`](#native-updater-check)
* [`native-updater help [COMMAND]`](#native-updater-help-command)
* [`native-updater update [SEMVER]`](#native-updater-update-semver)

## `native-updater check`

Outputs the current version from pbxproj and build.gradle

```
USAGE
  $ native-updater check

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ native-updater check
```

_See code: [src/commands/check.ts](https://github.com/matthias-karl-temedica/native-updater/blob/v1.0.5/src/commands/check.ts)_

## `native-updater help [COMMAND]`

display help for native-updater

```
USAGE
  $ native-updater help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_

## `native-updater update [SEMVER]`

Updates the version number in pbxproj and build.gradle files according to provided semver

```
USAGE
  $ native-updater update [SEMVER]

ARGUMENTS
  SEMVER  (major|minor|patch|<Number>) semver

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ native-updater update major
```

_See code: [src/commands/update.ts](https://github.com/matthias-karl-temedica/native-updater/blob/v1.0.5/src/commands/update.ts)_
<!-- commandsstop -->
