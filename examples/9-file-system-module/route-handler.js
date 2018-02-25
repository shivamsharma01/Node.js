var routeHandler = require('./route-functions');
exports.enableRoute = function (url, request, response) {
    //Get the pathname from the request.url
    var pathname = url.pathname;
    console.log("url_parts.pathname" + url.pathname);
    //According to the path name received, invoke the corresponding function
    switch (pathname) {
        case '/login': routeHandler.display_login(pathname, request, response);
            break;
        default: routeHandler.display_login(pathname, request, response);
    }
}