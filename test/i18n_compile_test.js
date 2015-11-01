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

var errorMsg = 'compilation should match the expected compiled file ';
var compiled_en = 'test/expected/file_per_lang/translations_en.json';
var compiled_pt = 'test/expected/file_per_lang/translations_pt.json';
var compiled_es = 'test/expected/file_per_lang/translations_es.json';
var errorLogFile = 'tmp/error_logging_tasks.log';

exports.i18n_compile = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  default_options: function (test) {
    test.expect(3);

    var actual_en = grunt.file.read('tmp/file_per_lang/translations_en.json');
    var actual_pt = grunt.file.read('tmp/file_per_lang/translations_pt.json');
    var actual_es = grunt.file.read('tmp/file_per_lang/translations_es.json');
    var expected_en = grunt.file.read(compiled_en);
    var expected_pt = grunt.file.read(compiled_pt);
    var expected_es = grunt.file.read(compiled_es);
    test.equal(actual_en, expected_en, errorMsg + compiled_en);
    test.equal(actual_pt, expected_pt, errorMsg + compiled_pt);
    test.equal(actual_es, expected_es, errorMsg + compiled_es);

    test.done();
  },
  merge_langs: function (test) {
    test.expect(1);

    var compiled = 'test/expected/merge_langs.json';
    var actual = grunt.file.read('tmp/merge_langs.json');
    var expected = grunt.file.read(compiled);
    test.equal(actual, expected, errorMsg + compiled);

    test.done();
  },
  lang_placing: function (test) {
    test.expect(3);

    var actual_en = grunt.file.read('tmp/filename_lang_placing/i18n-en-file.json');
    var actual_pt = grunt.file.read('tmp/filename_lang_placing/i18n-pt-file.json');
    var actual_es = grunt.file.read('tmp/filename_lang_placing/i18n-es-file.json');
    var expected_en = grunt.file.read(compiled_en);
    var expected_pt = grunt.file.read(compiled_pt);
    var expected_es = grunt.file.read(compiled_es);
    test.equal(actual_en, expected_en, errorMsg + compiled_en);
    test.equal(actual_pt, expected_pt, errorMsg + compiled_pt);
    test.equal(actual_es, expected_es, errorMsg + compiled_es);

    test.done();
  },
  lang_placing_missing_place: function (test) {
    test.expect(3);

    var actual_en = grunt.file.read('tmp/filename_lang_placing/missing/i18n-file_en.json');
    var actual_pt = grunt.file.read('tmp/filename_lang_placing/missing/i18n-file_pt.json');
    var actual_es = grunt.file.read('tmp/filename_lang_placing/missing/i18n-file_es.json');
    var expected_en = grunt.file.read(compiled_en);
    var expected_pt = grunt.file.read(compiled_pt);
    var expected_es = grunt.file.read(compiled_es);
    test.equal(actual_en, expected_en, errorMsg + compiled_en);
    test.equal(actual_pt, expected_pt, errorMsg + compiled_pt);
    test.equal(actual_es, expected_es, errorMsg + compiled_es);

    test.done();
  },
  lang_placing_multi: function (test) {
    test.expect(3);

    var actual_en = grunt.file.read('tmp/filename_lang_placing/en/i18n_en_file.json');
    var actual_pt = grunt.file.read('tmp/filename_lang_placing/pt/i18n_pt_file.json');
    var actual_es = grunt.file.read('tmp/filename_lang_placing/es/i18n_es_file.json');
    var expected_en = grunt.file.read(compiled_en);
    var expected_pt = grunt.file.read(compiled_pt);
    var expected_es = grunt.file.read(compiled_es);
    test.equal(actual_en, expected_en, errorMsg + compiled_en);
    test.equal(actual_pt, expected_pt, errorMsg + compiled_pt);
    test.equal(actual_es, expected_es, errorMsg + compiled_es);

    test.done();
  },
  lists: function (test) {
    test.expect(1);

    var compiled = 'test/expected/templates_merged.json';
    var actual = grunt.file.read('tmp/lists_merged.json');
    var expected = grunt.file.read(compiled);
    test.equal(actual, expected, errorMsg + compiled);

    test.done();
  },
  sibling_values_and_children: function (test) {
    test.expect(1);

    var error_log = grunt.file.read(errorLogFile);
    var errorFound = error_log.search(/Warning: Bad hierarchy format in "test\/fixtures\/sibling_values_and_children_i18n[.]yaml"/i);
    test.equal(errorFound >= 0, true, 'should have logged an error.');
    test.done();
  },
  bad_indentation: function (test) {
    test.expect(1);

    var error_log = grunt.file.read(errorLogFile);
    var errorFound = error_log.search(/Warning: bad indentation[\w\s]+?in "test\/fixtures\/bad_indentation_i18n[.]yaml"/i);
    test.equal(errorFound >= 0, true, 'should have logged an error.');
    test.done();
  }
};
