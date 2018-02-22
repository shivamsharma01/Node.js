var http = require('http');
var server = http.createServer(function (request, response) {
    console.log('Request Received');
});
server.listen('3000');
console.log('Server started, listening to port 3000');
