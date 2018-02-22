module.exports = function(username, password) {
    if (username === 'admin' && password === 'password') {
        return 'Successfully Authenticated';
    } else {
        return 'Authentication Failed';
    }
}