'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.i18n_compile = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  default_options: function (test) {
    test.expect(1);

    var actual_en = grunt.file.read('tmp/file_per_lang/translations_en.json');
    var actual_pt = grunt.file.read('tmp/file_per_lang/translations_pt.json');
    var actual_es = grunt.file.read('tmp/file_per_lang/translations_es.json');
    var expected_en = grunt.file.read('test/expected/file_per_lang/translations_en.json');
    var expected_pt = grunt.file.read('test/expected/file_per_lang/translations_pt.json');
    var expected_es = grunt.file.read('test/expected/file_per_lang/translations_es.json');
    test.equal(actual_en, expected_en, 'should describe what the default behavior is.');
    test.equal(actual_pt, expected_pt, 'should describe what the default behavior is.');
    test.equal(actual_es, expected_es, 'should describe what the default behavior is.');

    test.done();
  },
  merge_langs: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/merge_langs.json');
    var expected = grunt.file.read('test/expected/merge_langs.json');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  }
};
