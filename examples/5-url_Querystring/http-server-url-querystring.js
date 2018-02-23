var http = require('http');
var url = require('url');
var querystring = require('querystring');
var server = http.createServer(function(request,response) {
    const query = url.parse(request.url).query;
    const name = querystring.parse(query)['username'];
    response.writeHead(200,{'content-type': 'text/html'});
    response.write(`
    <html>
        <body>
            <h1>Requested with Username : ${name}</h1>
        </body>
    </html>
    `);
    response.end();
});
server.listen('3000');
console.log('Server started, listening to port 3000');