var http = require('http');
var module = require('./DBModule');
var server = http.createServer(function(request,response) {
    result = module.authenticateUser('admin','password');
    response.writeHead(200,{'content-type': 'text/html'});
    response.write(`
    <html>
        <body>
            <h1>${result}</h1>
        </body>
    </html>
    `);
    response.end();
});
server.listen('3000');
console.log('Server started, listening to port 3000');