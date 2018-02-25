var http = require('http');
var module = require('./DBModule');
var querystring = require('querystring');
var server = http.createServer(function (request, response) {
    var storage = '';
    request.on('data', function (chunk) {
        storage += chunk;
    });
    request.on('end', function (chunk) {
        var username = querystring.parse(storage)['username'];
        var password = querystring.parse(storage)['password'];
        var result = module.authenticateUser(username, password);
        response.writeHead(200, { 'content-type': 'text/html' });
        response.write(`
    <html>
        <body>
            <h1>${result}</h1>
        </body>
    </html>
    `);
        response.end();
    });
});
server.listen(3000);
console.log('Server started, listening to port 3000');