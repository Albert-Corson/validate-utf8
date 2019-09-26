const fs = require('fs');
const pathMod = require('path');
const isValid = require('utf-8-validate');
const isBinaryFileSync = require('isbinaryfile').isBinaryFileSync;

class ValidateUTF8 {
    static async isValid(path) {
        const pathStat = await fs.promises.lstat(path);

        if (pathStat.isDirectory()) {
            await this.isValidDir(path);
        } else {
            await this.isValidFile(path);
        }
    }

    static async isValidDir(path) {
        const dirs = await fs.promises.readdir(path);

        for (const dir of dirs) {
            this.isValid(pathMod.resolve(path, dir));
        }
    }

    static async isValidFile(path) {
        let buffer;

        try {
            buffer = await fs.promises.readFile(path);
        } catch (err) {
            console.error(`Error: can't read file: ${path}`);
            return;
        }
        if (isBinaryFileSync(buffer)) {
            console.error(`Ignoring binary file: ${path}`);
            return;
        }
        if (!(await isValid(buffer))) {
            console.log(path);
        }
    }
}

module.exports = ValidateUTF8;
