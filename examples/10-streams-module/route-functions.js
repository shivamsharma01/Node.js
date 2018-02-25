var module = require('./DBModule');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');

exports.display_login = function (request, response) {
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
            fs.appendFile('./log.txt', "User " + name + " has Logged in at " + new Date() + "\n", function (err, html) {
                if (err) {
                    throw err;
                }
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.readFile('./hero-welcome-page.html', function (err, html) {
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
};

exports.display_signup = function (request, response) {
    const html = fs.readFileSync('signup-page.html', function (err, html) {
        if (err) {
            throw err;
        }
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(html);
    response.end();
};

exports.first_page = function (request, response) {
    const html = fs.readFileSync('input-page-post.html', function (err, html) {
        if (err) {
            throw err;
        }
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(html);
    response.end();
};

exports.display_register = function (request, response) {
    data1 = '';
    request.on('data', function (chunk) {
        data1 += chunk;
    });
    request.on('end', function () {
        qs = querystring.parse(data1);
        name = qs['username'];
        password = qs['password'];
        confirmpassword = qs['confirmpassword'];
        if (password === confirmpassword) {
            fs.appendFile('./user.txt', "User " + name + " has been added at " + new Date() + "\n", function (err, html) {
                if (err) {
                    throw err;
                }
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.readFile('./user.txt', function (err, text) {
                if (err) {
                    throw err;
                }
            });
            response.writeHeader(200, { "Content-Type": "text/html" });
            response.write(text);
            response.end();
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write("<h2>password and confirm password did not match</h2>");
            response.end();
        }
    });
};

exports.view_hero = function(request, response) {
    query = url.parse(request.url).query;
    hero = querystring.parse(query)['hero'];
    var image = fs.createReadStream('../../assets/'+hero+'.jpg');
    image.on('open', function () {
        response.writeHead(200,'Content-Type', 'image/jpeg');
        image.pipe(response);
    });
    image.on('error', function () {
        response.writeHead(404,'Content-Type', 'text/plain');
        response.end('Not found');
    });
}


exports.view_hero = function(request, response) {
    query = url.parse(request.url).query;
    hero = querystring.parse(query)['hero'];
    var image = fs.createReadStream('../../assets/'+hero+'.jpg');
    image.on('open', function () {
        response.writeHead(200,'Content-Type', 'image/jpeg');
        image.pipe(response);
    });
    image.on('error', function () {
        response.writeHead(404,'Content-Type', 'text/plain');
        response.end('Not found');
    });
}