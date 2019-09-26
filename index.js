const validate = require('./validate');
const pathMod = require('path');

const path = pathMod.resolve(process.cwd(), process.argv[2] || '.');

validate.isValid(path).catch(err => console.error(err));