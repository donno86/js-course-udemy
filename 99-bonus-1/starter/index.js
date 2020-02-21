const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {
   // console.log(req.url);
    const pathname = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;

    if (pathname === '/products' || pathname === '/') {
        res.writeHead(200, {'Content-type': 'text/html'})
        res.end('these should show products');
    } 
    
    else if (pathname === '/laptop' && id < laptopData.length) {
        res.writeHead(200, {'Content-type': 'text/html'})
        res.end(`these should show detail laptop ${id}`);
    } 
    
    else {
        res.writeHead(404, {'Content-type': 'text/html'})
        res.end('Page was not found on server!');
    }

    res.writeHead(200, {'Content-type': 'text/html'})
    res.end('this is the response');
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now');
});
