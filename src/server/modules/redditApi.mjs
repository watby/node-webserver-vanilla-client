// import https from 'https';
// import util from 'util';
import {readFromFileAsync} from "./fileHelpers.mjs";

// const getAsync = util.promisify(https.get);

export async function getPostsAsync(topic) {
    // const data = await getAsync(`https://www.reddit.com/r/${topic}.json`);
    const jsonString = await readFromFileAsync(`etc/data/${topic}.json`);
    return JSON.parse(jsonString).data.children.map((post) => post.data);
}

export async function* getAllPostsAsync() {
    for(let post of await getPostsAsync('aww')) {
        yield post;
    }
    for(let post of await getPostsAsync('funny')) {
        yield post;
    }
}
