const fs = require('fs');
const pathMod = require('path');
const isValid = require('utf-8-validate');
const isBinaryFileSync = require('isbinaryfile').isBinaryFileSync;

class ValidateUTF8 {
    static loadIgnore(pathToCheck) {
        let toIgnore = [];
        const data = fs.readFileSync(pathMod.resolve(process.cwd(), '.utf8-ignore'), 'utf-8').split('\n');

        for (const str of data) {
            if (str.length > 0) {
                toIgnore.push(pathMod.resolve(process.cwd(), pathToCheck, str));
            }
        }
        return toIgnore;
    }

    static async isValid(path, toIgnore) {
        const pathStat = await fs.promises.lstat(path);

        if (pathStat.isDirectory()) {
            this.isValidDir(path, toIgnore);
        } else {
            await this.isValidFile(path);
        }
    }

    static async isValidDir(path, toIgnore) {
        const dirs = await fs.promises.readdir(path);

        for (const dir of dirs) {
            const toCheck = pathMod.resolve(path, dir);

            if (!toIgnore || !toIgnore.includes(toCheck)) {
                // 'await' needed to prevent a error raised when reading too many files a once
                await this.isValid(toCheck, toIgnore);
            }
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
