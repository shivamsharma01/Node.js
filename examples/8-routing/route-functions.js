var module = require('./DBModule');
var urlModule = require('url');
var querystring = require('querystring');

exports.display_login = function (url, request, response) {
    storage = '';
    request.on('data', function (chunk) {
        storage += chunk;
    });
    request.on('end', function () {
        const qs = querystring.parse(storage);
        name = qs['username'];
        password = qs['password'];
        result = module.authenticateUser(name, password);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(`<html><body><h1> ${result ? 'Authenticated Successfully' : 'Authentication Failed'} </h1></body></html>`);
    });
}

exports.display_signup = function (url, request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    var html = `
    <body bgcolor='#32CD32'>
        <H1>Welcome To Router Example</H1>
        <h4>SignUp</h4>
        <form name='myform' action='http://localhost:3000/register' method='post'>
            <table>
                <tr>
                    <td>UserName:</td>
                    <td><input type='text' name='username' value=' ' /></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><input type='password' name='password' value=' ' />                                       </td>
                </tr>
                <tr>
                    <td>Confirm Password:</td>
                    <td><input type='password' name='confirmpassword' value=' ' /></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type='submit' value='Register' /></td>
                </tr>
            </table>
        </form>
    </body > `;
    response.write(html);
    response.end();
}

