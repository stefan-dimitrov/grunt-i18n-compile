/*
 * grunt-i18n-compile
 * http://github.com/stefan-dimitrov/grunt-i18n-compile
 *
 * Copyright (c) 2015 Stefan Dimitrov
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('i18n_compile',
    'Assemble JSON output files from language-merged YAML input files.', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      merge: false
    });

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Read specified files.
      var src = file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read YAML file.
        return grunt.file.readYAML(filepath);
      });

      var compiled = compileTranslations(src);

      // Handle options.
      if (options.merge) {
        // Write the (single) destination file.
        grunt.file.write(file.dest, JSON.stringify(compiled));

        // Print a success message.
        grunt.log.writeln('File "' + file.dest + '" created.');

        console.log('file obj:', JSON.stringify(file));

        return;
      }

      // Write the destination files.
      for (var lang in compiled) {
        var fileDest = langFileDest(file, lang);
        grunt.file.write(fileDest, JSON.stringify(compiled[lang]));

        // Print a success message.
        grunt.log.writeln('File "' + fileDest + '" created.');
      }

    });
  });

  function compileTranslations (srcList) {
    var compiled = {};
    var rawJson = {};

    for (var i in srcList) {
      _.merge(rawJson, srcList[i]);
    }

    var result = recurseObject(rawJson);

    // Merge result chains
    for (i = 0; i < result.length; i++) {
      var lang = result[i][0];
      if (!compiled[lang]) {
        compiled[lang] = {};
      }
      _.merge(compiled[lang], result[i][1]);
    }
    return compiled;
  }

  function recurseObject (subObject) {
    var resultList = [];
    for (var property in subObject) {
      // Get the language key and the translation value
      if (_.isString(subObject[property])) {
        resultList.push([property, subObject[property]]);
        continue;
      }

      // Nothing to do here. Just skip over
      if (!_.isPlainObject(subObject[property])) {
        continue;
      }

      // Do deeper and build the result chain
      var result = recurseObject(subObject[property]);
      for (var i = 0; i < result.length; i++) {
        var tmp = {};
        tmp[property] = result[i][1];
        resultList.push([result[i][0], tmp]);
      }
    }

    return resultList;
  }

  function langFileDest (file, lang) {
    var parts = file.dest.split(/([.][^.\/]+$)/i, 2);

    if (parts.length > 1) {
      return parts[0] + lang + parts[1];
    }

    return parts[0] + lang;
  }

};
