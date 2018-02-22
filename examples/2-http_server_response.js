var http = require('http');
var server = http.createServer(function (request, response) {
    response.writeHead(200, { 'content-Type': "text/html" });
    response.write(`
    <html>
        <body>
            <h1>Hello Welcome to Node Http Server!</h1>
        </body>
    </html>
    `);
});
server.listen('3000');
console.log('Server started, listening to port 3000');
