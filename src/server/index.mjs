import {default as https} from 'https';
import {readFromFileAsync} from "./modules/fileHelpers.mjs";
import http from 'http';
import {getPostsAsync} from "./modules/redditApi.mjs";
import {getPostTitle} from "./modules/redditHelpers.mjs";
import {getAllPostsAsync} from "./modules/redditApi.mjs";
import {readFromFileAsAStream} from "./modules/fileStreamHelpers.mjs";
import fs from "fs";

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
    console.log(`${req.method} ${req.url}`);

    switch (true) {
        case '/' === req.url && req.method === 'GET': {
            const html = await readFromFileAsync('src/client/index.html');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
            break;
        }
        case /\/aww/g.test(req.url)  && req.method === 'GET': {
            const posts = await getPostsAsync('aww');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
            res.end(JSON.stringify(posts));
            break;
        }
        case /\/funny/g.test(req.url) && req.method === 'GET': {
            try {
                const posts = await getPostsAsync('aww');
                const titles = posts.map(getPostTitle);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(titles));
            } catch(err) {
                console.error(err);
                res.statusCode = 500;
                res.end();
            }
            break;
        }
        case /\/all/g.test(req.url) && req.method === 'GET': {
            try {
                for await(let post of getAllPostsAsync()) {
                    console.log(post.title);
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end();
            } catch(err) {
                console.error(err);
                res.statusCode = 500;
                res.end();
            }
            break;
        }
        case /\/stream/g.test(req.url) && req.method === 'GET': {
            try {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                fs
                    .createReadStream('etc/data/aww.json')
                    .pipe(res)
                    .on('end', () => {
                        res.end();
                    });
            } catch(err) {
                console.error(err);
                res.statusCode = 500;
                res.end();
            }
            break;
        }
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('404\nNot found!');
    }
});

// server.on('request', (req, res) => {
//     console.log(`${req.method} ${req.url}`);
// });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
