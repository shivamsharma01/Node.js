var http = require('http');
var url = require('url');
var querystring = require('querystring');
var module = require('./DBModule');
var eventModule = require('./custom-event-handler');
var server = http.createServer(function (request, response) {
    const query = url.parse(request.url).query;
    const name = querystring.parse(query)['username'];
    const password = querystring.parse(query)['password'];
    const result = module.authenticateUser(name, password);
    if (result) {
        response.writeHead(200, { 'content-type': 'text/html' });
        visitors = eventModule.gamersCountEvent();
        response.write(`
    <html>
        <body>
            <h1>${visitors} Gamer(s) joined the room.</h1>
        </body>
    </html>
    `);
    } else {
        response.writeHead(400, { 'content-type': 'text/html' });
        response.write(`
    <html>
        <body>
            <h1>Authentication Failed</h1>
        </body>
    </html>
    `);
    }
    response.end();
});
server.listen('3000');
console.log('Server started, listening to port 3000');