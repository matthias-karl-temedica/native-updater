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
$ npm install -g updater
$ native-updater COMMAND
running command...
$ native-updater (-v|--version|version)
updater/0.0.0 darwin-x64 node-v15.3.0
$ native-updater --help [COMMAND]
USAGE
  $ native-updater COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`native-updater hello [FILE]`](#native-updater-hello-file)
* [`native-updater help [COMMAND]`](#native-updater-help-command)

## `native-updater hello [FILE]`

describe the command here

```
USAGE
  $ native-updater hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ native-updater hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/matthias-karl-temedica/native-updater/blob/v0.0.0/src/commands/hello.ts)_

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
<!-- commandsstop -->
