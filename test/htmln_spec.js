describe("htmln", function() {
  console.log(Object.keys(__html__));

  var FIXTURES = Object.keys(__html__).reduce(function(fixtures, filename) {
    var match = filename.match(/^test\/fixtures\/(actual|expected)\/(.*)\.html$/),
        type = match[1],
        name = match[2];

    fixtures[type.toUpperCase()][name] = __html__[filename];
    return fixtures;
  }, { ACTUAL: {}, EXPECTED: {} });

  Object.keys(FIXTURES.ACTUAL).forEach(function(name) {
    describe("for " + name, function() {
      it("makes html readable", function() {
        expect(htmln(FIXTURES.ACTUAL[name])).to.equal(FIXTURES.EXPECTED[name]);
      });
    });
  });
});
