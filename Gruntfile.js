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

  var _ = require('lodash');
  var logfile = require('logfile-grunt');

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
      },
      sibling_values_and_children: {
        options: {
          merge: true
        },
        files: {
          'tmp/sibling_values_and_children.json': ['test/fixtures/sibling_values_and_children_i18n.yaml']
        }
      },
      bad_indentation: {
        options: {
          merge: true
        },
        files: {
          'tmp/bad_indentation.json': ['test/fixtures/bad_indentation_i18n.yaml']
        }
      },
      duplicated_keys: {
        options: {
          merge: true
        },
        files: {
          'tmp/duplicated_value_keys.json': ['test/fixtures/duplicated_value_keys_i18n.yaml']
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

  var ERROR_TASKS = ['bad_indentation', 'sibling_values_and_children', 'duplicated_keys'];

  /**
   * Gather i18n_compile sub-tasks to be executed
   * @param {Array} excluded list of excluded sub-tasks
   * @returns {Array} the sub-tasks
   */
  function subTasksExcluding(excluded) {
    var mainTask = 'i18n_compile';
    var i18nCompileTasks = grunt.config.data[mainTask];

    var subTasks = _.keys(i18nCompileTasks);
    return _.difference(subTasks, excluded).map(function (subTask) {
      return mainTask + ':' + subTask;
    });
  }

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('success_tasks', 'Tasks expected to succeed.', function () {
    grunt.task.run(subTasksExcluding(ERROR_TASKS));
  });

  grunt.registerTask('error_tasks', 'Tasks expected to produce errors.', function () {
    logfile(grunt, {filePath: 'tmp/error_logging_tasks.log', clearLogFile: true});

    grunt.task.run(ERROR_TASKS.map(function (subTask) {
      return 'i18n_compile:' + subTask;
    }));
  });

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'success_tasks', 'force:error_tasks', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
