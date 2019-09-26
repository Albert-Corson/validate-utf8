# validate-utf8
This is a NodeJS script that verifies is a file/directory only contains UTF-8 encoded characters

## Usage
```
npm start <pathToValidate>
```

This will print the absolute paths of non UTF-8 file on the standard output for easy redirection.
Path that refer to binary files or that can't be read will be printed on the standard error output with a short error message

`.utf8-ignore` - You can create a '_.utf8-ignore_' file in your working directory containing paths to ignore, these paths are relative to pwd but can also be absolute. The content of this file should be in UTF-8.

_This script uses [utf-8-validate](https://github.com/websockets/utf-8-validate) and [isbinaryfile](https://github.com/gjtorikian/isBinaryFile) node modules_