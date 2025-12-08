const http = require('http');

let nextId = 1;
const students = [
    { id: nextId++, name: "Abebe" },
    { id: nextId++, name: "Kebede" }
];

function sendJSON(res, statusCode, payload) {
    const json = JSON.stringify(payload);
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(json)
    });
    res.end(json);
}

function sendText(res, statusCode, text) {
    res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
    res.end(text);
}

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname.replace(/\/+$/, '');

    if (method === 'GET' && pathname === '/students') {
        return sendJSON(res, 200, students);
    }
    if (method === 'POST' && pathname === '/students') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            if (!body) return sendJSON(res, 400, { error: 'Request body required' });
            try {
                const parsed = JSON.parse(body);
                if (!parsed.name || typeof parsed.name !== 'string') {
                    return sendJSON(res, 400, { error: 'Field "name" (string) is required' });
                }
                const student = { id: nextId++, name: parsed.name };
                students.push(student);
                return sendJSON(res, 201, student);
            } catch (err) {
                return sendJSON(res, 400, { error: 'Invalid JSON' });
            }
        });
        return;
    }

    const studentIdMatch = pathname.match(/^\/students\/([0-9]+)$/);
    if (studentIdMatch) {
        const id = Number(studentIdMatch[1]);

        if (method === 'PUT') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                if (!body) return sendJSON(res, 400, { error: 'Request body required' });
                try {
                    const parsed = JSON.parse(body);
                    if (!parsed.name || typeof parsed.name !== 'string') {
                        return sendJSON(res, 400, { error: 'Field "name" (string) is required' });
                    }
                    const idx = students.findIndex(s => s.id === id);
                    if (idx === -1) return sendJSON(res, 404, { error: 'Student not found' });
                    students[idx].name = parsed.name;
                    return sendJSON(res, 200, students[idx]);
                } catch (err) {
                    return sendJSON(res, 400, { error: 'Invalid JSON' });
                }
            });
            return;
        }

        if (method === 'DELETE') {
            const idx = students.findIndex(s => s.id === id);
            if (idx === -1) return sendJSON(res, 404, { error: 'Student not found' });
            const removed = students.splice(idx, 1)[0];
            return sendJSON(res, 200, { message: `Student with id ${removed.id} deleted`, student: removed });
        }
    }

    sendText(res, 404, 'Route not found');
});

server.listen(4000, () => {
    console.log('Server listening on port 4000');
});
