var mockProcess = new (require('events').EventEmitter)()
mockProcess.nextTick = process.nextTick
mockProcess.hrtime = process.hrtime || function (last) {
  var now = typeof performance !== 'undefined' && performance.now ?
    performance.now() : +new Date
  return [now / 1e3 - (last && last[0] || 0), 0]
}
var origSetTimeout = setTimeout
var test = require('tape-catch')
test('test-timers-ordering.js', function (tape) {
  var process = mockProcess
  var timers = require('../timers')
  var setTimeout = timers.setTimeout
  var clearTimeout = timers.clearTimeout
  var setInterval = timers.setInterval
  var clearInterval = timers.clearInterval
  var setImmediate = timers.setImmediate
  var clearImmediate = timers.clearImmediate


// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// var common = require('../common');
var assert = require('assert');
// var Timer = process.binding('timer_wrap').Timer;
var Timer = {}
Timer.now = !!(typeof performance !== 'undefined' && performance.now) ?
  performance.now.bind(performance) : function() { return +new Date }

var i;

var N = 30;

var last_i = 0;
var last_ts = 0;
var start = Timer.now();

var f = function(i) {
  if (i <= N) {
    // check order
    assert.equal(i, last_i + 1, 'order is broken: ' + i + ' != ' + last_i + ' + 1');
    last_i = i;

    // check that this iteration is fired at least 1ms later than the previous
    var now = Timer.now();
//     console.log(i, now);
    assert(now >= last_ts + 1, 'current ts ' + now + ' < prev ts ' + last_ts + ' + 1');
    last_ts = now;

    // schedule next iteration
    setTimeout(f, 1, i + 1);
  }
};
f(1);




  origSetTimeout(function () {
    process.emit('exit')
    tape.pass()
    tape.end()
  }, 230)
})