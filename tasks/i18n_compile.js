/*
 * grunt-i18n-compile
 * http://github.com/stefan-dimitrov/grunt-i18n-compile
 *
 * Copyright (c) 2016 Stefan Dimitrov
 * Licensed under the MIT license.
 */

'use strict';

var i18n_compile = require('i18n-compile');

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
      i18n_compile(file.src, file.dest, options);
    });
  });
};
