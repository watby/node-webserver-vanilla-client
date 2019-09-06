import fs from 'fs';
import util from 'util';

// https://nodejs.org/en/docs/guides/backpressuring-in-streams/
export function readFromFileAsAStream(path, outStream) {
    fs.createReadStream(path).pipe(outStream);
}

// https://nodejs.org/en/docs/guides/backpressuring-in-streams/
export function readFromFileAsAPipeAStream(path, outStream) {
    fs.createReadStream(path).pipe(outStream);
}
