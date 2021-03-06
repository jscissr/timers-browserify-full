var test = require('tape-catch-onerror');
var timers = require('../timers');

var setTimeout = timers.setTimeout;
var clearTimeout = timers.clearTimeout;
var setInterval = timers.setInterval;
var clearInterval = timers.clearInterval;
var setImmediate = timers.setImmediate;
var clearImmediate = timers.clearImmediate;

function shouldNotReach() {
  throw new Error('Should not reach this');
}

test('all methods can be called normally without throwing', function (t) {
  var id;
  id = setTimeout(shouldNotReach, 200);
  id.unref();
  id.ref();
  clearTimeout(id);
  clearTimeout(null);

  id = setTimeout(shouldNotReach);
  id.close();

  id = setInterval(shouldNotReach, 200);
  id.unref();
  id.ref();
  clearInterval(id);
  clearInterval(null);

  id = setInterval(shouldNotReach);
  id.close();

  id = setImmediate(shouldNotReach);
  clearImmediate(id);
  clearImmediate(null);

  t.end();
});
