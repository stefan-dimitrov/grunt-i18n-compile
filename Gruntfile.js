/*
 * grunt-i18n-compile
 * http://github.com/stefan-dimitrov/grunt-i18n-compile
 *
 * Copyright (c) 2015 Stefan Dimitrov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    i18n_compile: {
      default_options: {
        options: {},
        files: {
          'tmp/file_per_lang/translations_.json': ['test/fixtures/menu_i18n.yaml', 'test/fixtures/country_i18n.yaml']
        }
      },
      merge_langs: {
        options: {
          merge: true
        },
        files: {
          'tmp/merge_langs.json': ['test/fixtures/menu_i18n.yaml', 'test/fixtures/country_i18n.yaml']
        }
      },
      lang_placing: {
        options: {
          langPlace: '[lang]'
        },
        files: {
          'tmp/filename_lang_placing/i18n-[lang]-file.json': ['test/fixtures/menu_i18n.yaml', 'test/fixtures/country_i18n.yaml']
        }
      },
      lang_placing_missing_place: {
        options: {
          langPlace: '[lang]'
        },
        files: {
          'tmp/filename_lang_placing/missing/i18n-file_.json': ['test/fixtures/menu_i18n.yaml', 'test/fixtures/country_i18n.yaml']
        }
      },
      lang_placing_multi: {
        options: {
          langPlace: '{lang}'
        },
        files: {
          'tmp/filename_lang_placing/{lang}/i18n_{lang}_file.json': ['test/fixtures/menu_i18n.yaml', 'test/fixtures/country_i18n.yaml']
        }
      },
      lists: {
        options: {
          merge: true
        },
        files: {
          'tmp/lists_merged.json': ['test/fixtures/templates_i18n.yaml']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    watch: {
      scripts: {
        files: ['tasks/*.js', 'test/*.js'],
        tasks: ['jshint', 'test']
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'i18n_compile', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
