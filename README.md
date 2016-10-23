# grunt-i18n-compile  [![Build Status](https://travis-ci.org/stefan-dimitrov/grunt-i18n-compile.svg?branch=master)](https://travis-ci.org/stefan-dimitrov/grunt-i18n-compile)

Assemble JSON translation files from language-merged YAML with [i18n-compile](https://github.com/stefan-dimitrov/i18n-compile).

Output files are compatible with [angular-translate](https://angular-translate.github.io/) and [i18next](http://i18next.com/)

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

## The translation format

The format is inspired by [grunt-translate-compile](https://www.npmjs.com/package/grunt-translate-compile).

It is intended to greatly reduce the amount of typing needed to translate your app.

The YAML file format is used because it requires less typing compared to JSON - no need to enclose both properties and values in `" "`s,
and nesting is done by indentation instead of blocks of curly braces.

The structure of the translations inside the file is like the following:
```yaml
MENU:
  CART:
    EMPTY:
      en: Empty Cart
      pt: Esvaziar Carrinho
      es: Vaciar Carrito
    CHECKOUT:
      en: Checkout
      pt: Fechar Pedido
      es: Realizar Pedido
  USER:
    LABEL:
      en: User
      pt: Usuário
      es: Usuario
    DROPDOWN:
      EDIT:
        en: Edit
        pt: Editar
        es: Editar
      LOGOUT:
        en: Logout
        pt: Sair
        es: Finalizar la Sesión
```

Notice how the translation values are assigned directly to the language keys.
This way translations for all languages can be described in a single file, which eliminates the need to copy
the translation ids over to other files for each language that you have.

That structure reduces the size of your sources and makes your translations more manageable.

Compiling the above example will result in the following output files:
- *translation_en.json*
  ```json
  {
    "MENU": {
      "CART": {
        "EMPTY": "Empty Cart",
        "CHECKOUT": "Checkout"
      },
      "USER": {
        "LABEL": "User",
        "DROPDOWN": {
          "EDIT": "Edit",
          "LOGOUT": "Logout"
        }
      }
    }
  }

  ```

- *translation_pt.json*
  ```json
  {
    "MENU": {
      "CART": {
        "EMPTY": "Esvaziar Carrinho",
        "CHECKOUT": "Fechar Pedido"
      },
      "USER": {
        "LABEL": "Usuário",
        "DROPDOWN": {
          "EDIT": "Editar",
          "LOGOUT": "Sair"
        }
      }
    }
  }

  ```

- *translation_es.json*
  ```json
  {
    "MENU": {
      "CART": {
        "EMPTY": "Vaciar Carrito",
        "CHECKOUT": "Realizar Pedido"
      },
      "USER": {
        "LABEL": "Usuario",
        "DROPDOWN": {
          "EDIT": "Editar",
          "LOGOUT": "Finalizar la Sesión"
        }
      }
    }
  }

  ```

## The "i18n_compile" task

### Overview
In your project's Gruntfile, add a section named `i18n_compile` to the data object passed into `grunt.initConfig()`.

Example:
```js
grunt.initConfig({
  i18n_compile: {
    options: {
      langPlace: '[lang]'
    },
    your_target: {
      files: {
        'dest/i18n/[lang].json': ['src/app/**/*.yaml', 'src/common/**/*.yaml']
      }
    },
  },
})
```

### Options

#### options.langPlace
Type: `String`
Default value: `''` *(empty string)*

If specified the value*(if present in the output file path)* will be replaced with the language id.

This option has no effect when the `merge` option is `true`.

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
    default_target: {
      files: {
        'dest/translations-.json': ['src/**/*.yml']
      }
    }
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


#### Placement of language id
In this example, the language id is placed at a custom location in the output file path

```js
grunt.initConfig({
  i18n_compile: {
    options: {
      langPlace: '<lang>'
    },
    default_target: {
      files: {
        'dest/path/<lang>-translations.json': ['src/**/*.yml']
      }
    }
  },
})
```
So if we have the languages `en` and `bg`, the resulting files will be
```
dest/path/en-translations.json
dest/path/bg-translations.json
```


#### Merge translations in one file
With `merge` set to `true` the compiled translations for all languages are merged into a single file

```js
grunt.initConfig({
  i18n_compile: {
    options: {
      merge: true
    },
    default_target: {
      files: {
        'dest/translations.json': ['src/**/*.yml']
      }
    }
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
