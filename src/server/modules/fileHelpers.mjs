import fs from 'fs';
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);

// https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/
export function readFromFileAsync(path) {
    return readFileAsync(path);
}
