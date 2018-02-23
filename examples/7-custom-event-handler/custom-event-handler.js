var eventEmitter = require('events').EventEmitter;
var util = require('util');
RegisterEventClass = function (initialCount) {
    this.counter = initialCount;
};
util.inherits(RegisterEventClass, eventEmitter);
RegisterEventClass.prototype.increment = function () {
    this.counter++;
    this.emit('join');
};
var registerEventAccessObj = new RegisterEventClass(0);
registerEventAccessObj.on('join', function () {
    console.log(this.counter, ' Gamer(s) joined the room.');
    globalCount = this.counter;
});
exports.gamersCountEvent = function () {
    registerEventAccessObj.increment();
    return globalCount;
};
