import fs from 'fs';

// https://nodejs.org/en/docs/guides/backpressuring-in-streams/
export function readFromFileAsAStream(path, outStream) {
    fs.createReadStream(path).pipe(outStream);
}
