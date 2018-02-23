var module = require('./DBModule');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');

exports.display_login = function (url, request, response) {
    data1 = '';
    request.on('data', function (chunk) {
        data1 += chunk;
    });
    request.on('end', function () {
        qs = querystring.parse(data1);
        name = qs['username'];
        password = qs['password'];
        result = module.authenticateUser(name, password);
        if (result) {
            fs.appendFile('./log.txt', "User " + name + " has Logged in at " + new Date()+"\n", function (err, html) {
                if (err) {
                    throw err;
                }
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.readFile('./read.txt', function (err, html) {
                if (err) {
                    throw err;
                }
                response.writeHeader(200, { "Content-Type": "text/html" });
                response.write(html);
                response.end();
            });
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write("Invalid User try login Again!!");
            response.end();
        }
    });
}
