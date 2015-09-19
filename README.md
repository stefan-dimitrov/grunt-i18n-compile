# grunt-i18n-compile  &nbsp; [ ![Codeship Status for stefan-dimitrov/grunt-i18n-compile](https://codeship.com/projects/06c87fd0-4149-0133-3d15-4252ee2bf12d/status?branch=master)](https://codeship.com/projects/103580)

Grunt Plugin for assembling JSON output files from language-merged YAML input files.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-i18n-compile --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-i18n-compile');
```

## The "i18n_compile" task

### Overview
In your project's Gruntfile, add a section named `i18n_compile` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  i18n_compile: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.merge
Type: `Boolean`
Default value: `false`

If `true` the output will be a single file with the translations for all languages merged inside it.

### Usage Examples

#### Default Options
In this example, the compiled translations for each language are written to a separate file

```js
grunt.initConfig({
  i18n_compile: {
    options: {},
    files: {
      'dest/translations-.json': ['src/**/*.yml'],
    },
  },
})
```
The language id is by default inserted right before the last `.` of the file name. *(If there is no `.` present
then the language id is inserted at the end of the file name)* <br>
So if we have the languages `en` and `bg`, the resulting files will be
```
dest/translations-en.json
dest/translations-bg.json
```


#### Merge translations in one file
In this example, the compiled translations for all languages are merged into a single file

```js
grunt.initConfig({
  i18n_compile: {
    options: {
      merge: true
    },
    files: {
      'dest/translations.json': ['src/**/*.yml'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
