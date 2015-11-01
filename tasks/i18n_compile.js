/*
 * grunt-i18n-compile
 * http://github.com/stefan-dimitrov/grunt-i18n-compile
 *
 * Copyright (c) 2015 Stefan Dimitrov
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');
var yaml = require('js-yaml');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('i18n_compile',
    'Assemble JSON translation files from language-merged YAML input files.', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      merge: false,
      langPlace: ''
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
        var content = yaml.safeLoad(grunt.file.read(filepath), {
          filename: filepath,
          schema: yaml.JSON_SCHEMA
        });

        return {
          filePath: filepath,
          content: content
        };
      });

      var compiled = compileTranslations(src);

      // Handle options.
      if (options.merge) {
        // Write the (single) destination file.
        grunt.file.write(file.dest, JSON.stringify(compiled));

        // Print a success message.
        grunt.log.writeln('File "' + file.dest + '" created.');

        return;
      }

      // Write the destination files.
      for (var lang in compiled) {
        var fileDest = langFileDest(file, lang, options.langPlace);
        grunt.file.write(fileDest, JSON.stringify(compiled[lang]));

        // Print a success message.
        grunt.log.writeln('File "' + fileDest + '" created.');
      }

    });
  });

  /*jshint latedef: nofunc */
  function compileTranslations (srcList) {
    var compiled = {};

    var result = [];
    for (var i in srcList) {
      var rawScr = srcList[i];

      try {
        var tempResult = recurseObject(rawScr.content);
        result = result.concat(tempResult);
      } catch (e) {
        throw new Error(e.message + ' in "' + rawScr.filePath + '" at ' + e.atProperty);
      }
    }

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

  /*jshint latedef: nofunc */
  function recurseObject (subObject) {
    var resultList = [];
    var hasValues = false;
    var hasChildren = false;

    for (var property in subObject) {
      // Get the language key and the translation value
      if (!_.isPlainObject(subObject[property])) {
        hasValues = true;
        checkHierarchy(hasValues, hasChildren, property);
        resultList.push([property, subObject[property]]);
        continue;
      }

      // Go deeper and build the result chain
      hasChildren = true;
      checkHierarchy(hasValues, hasChildren, property);
      var result = recurseObject(subObject[property]);
      for (var i = 0; i < result.length; i++) {
        var tmp = {};
        tmp[property] = result[i][1];
        resultList.push([result[i][0], tmp]);
      }
    }

    return resultList;
  }

  /*jshint latedef: nofunc */
  function checkHierarchy(hasValues, hasChildren, property) {
    if (hasValues && hasChildren) {
      var error = new Error('Bad hierarchy format');
      error.atProperty = property;
      throw error;
    }
  }

  /*jshint latedef: nofunc */
  function langFileDest (file, lang, langPlace) {
    if (langPlace && file.dest.indexOf(langPlace) >= 0) {

      var matching = new RegExp(_.escapeRegExp(langPlace), 'g');
      return file.dest.replace(matching, lang);
    }

    // Default - place language id before last '.'
    var parts = file.dest.split(/([.][^.\/]+$)/i, 2);

    if (parts.length > 1) {
      return parts[0] + lang + parts[1];
    }

    return parts[0] + lang;
  }

};
