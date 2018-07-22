// Use tape
var test = require("tape");
//Link to logic.js:
var logic = require("./logic.js");

// test that tape is working:
test("Testing Tape is working", function(t) {
  t.equal(1, 1, "One should equal one");
  t.end();
});
test("Tape is working", function(t) {
  t.equal(1, 1, "1 equals 1");
  t.end();
});
