const http = require('http');

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === 'GET' && url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end("Welcome to the Home Page");
    }

    if (method === 'GET' && url === '/info') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end("This is the information page");
    }

    if (method === 'POST' && url === '/submit') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const jsonData = JSON.parse(body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(jsonData));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end("Invalid JSON");
            }
        });

        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("Route not found");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});