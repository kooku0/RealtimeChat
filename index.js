const HLS_Server = require('hls-server')
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

const PORT = process.env.PORT || 8000;
const audoPath = __dirname + "/audio/";
const viewPath = __dirname + "/view/";

var server = http.createServer((req, res) => {
    var uri = url.parse(req.url).pathname;
    console.log(uri);
    if (uri === '/') {
        res.writeHead(302, {
            'Location': '/play_demo'
        });
        res.end();
        return;
    }
    else if (uri === '/play_demo') {
         res.writeHead(200, {
            'Content-Type': 'text/html'
         });
         const stream = fs.createReadStream(viewPath + "play_demo.html");
         stream.pipe(res);
         return;
    }
    else if (uri === '/capture_audio') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        const stream = fs.createReadStream(viewPath + "capture_audio.html");
        stream.pipe(res);
        return;
    }
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>404 Error, Check your URL</h1>');
        return;
    }
})

server.listen(PORT, () => { console.log('run server: ' + PORT)})