exports.authenticateUser = function(username, password) {
    if (username === 'admin' && password === 'password') {
        return true;
    } else {
        return false;
    }
}