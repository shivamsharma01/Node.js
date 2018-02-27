var module = require('./DBModule');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var zlib = require('zlib');

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
            response.writeHeader(200, { "Content-Type": "text/html" });
            response.write(`<h1>Successfully Registered</h1>`);
            response.end();
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write("<h2>Password does not match with confirm password!!</h2>");
            response.end();
        }
    });
};

exports.view_hero = function (request, response) {
    query = url.parse(request.url).query;
    hero = querystring.parse(query)['hero'];
    var image = fs.createReadStream('../../assets/' + hero + '.jpg');
    image.on('open', function () {
        response.writeHead(200, 'Content-Type', 'image/jpeg');
        image.pipe(response);
    });
    image.on('error', function () {
        response.writeHead(404, 'Content-Type', 'text/plain');
        response.end('Not found');
    });
}
exports.download_hero = function (request, response) {
    query = url.parse(request.url).query;
    hero = querystring.parse(query)['hero'];
    var image = fs.createReadStream('../../assets/' + hero + '.jpg');
    var dir = "D://heroes//";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    wstream = fs.createWriteStream(dir + hero + ".gz");
    var gzip = zlib.createGzip();
    image.pipe(gzip).pipe(wstream).on('finish', function () {
        console.log('Finished compressing');
        response.end();
    });
} 