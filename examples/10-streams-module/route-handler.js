var routeHandler = require('./route-functions');
exports.enableRoute = function (url, request, response) {
    //Get the pathname from the request.url
    var pathname = url.pathname;
    console.log("url_parts.pathname" + url.pathname);
    //According to the path name received, invoke the corresponding function
    switch (pathname) {
        case '/': routeHandler.first_page(request, response);
            break;
        case '/login': routeHandler.display_login(request, response);
            break;
        case '/signup': routeHandler.display_signup(request, response);
            break;
        case '/register': routeHandler.display_register(request, response);
            break;
        case '/heroes/': routeHandler.view_hero(request, response);
            break;
        default: routeHandler.first_page(request, response);
    }
}