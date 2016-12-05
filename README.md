[![Bower](https://img.shields.io/bower/v/jquery-jcreate.svg?style=flat-square)](https://github.com/marcomontalbano/jquery-jcreate/releases/latest)
[![Build Status](https://img.shields.io/travis/marcomontalbano/jquery-jcreate/master.svg?style=flat-square)](https://travis-ci.org/marcomontalbano/jquery-jcreate)
[![Codacy](https://img.shields.io/codacy/grade/e27821fb6289410b8f58338c7e0bc686/master.svg?style=flat-square)](https://www.codacy.com/app/marcomontalbano/jquery-jcreate/dashboard)

jCreate
=======

jCreate is a plugin for jQuery that adds a new bindable event.

Now you can do something cool when one or more elements are created and are available on the page.

See it in action with [CodePen].


Install with Bower
------------------

You can install jCreate using [Bower]:

```sh
bower install --save jquery-jcreate
```

And now you can include it in you project with a `<script>` tag.

```sh

<script type="text/javascript" src="jquery.jcreate.min.js"></script>
```

How to use
----------

jCreate works with the [jQuery Event Delegation].

```js
// bind 'create' event.
$( '#dataTable tbody' ).on( 'create', 'tr', function() {
    console.log( $( this ).text() );
});

// add a new 'row'.
$( '#dataTable tbody' ).append('<tr><td>this is a new row!</td></tr>');
```

### jQuery Support

Since I use the last version of `jasmine-jquery` library in order to test my own plugin, I cannot ensure that the plugin works with jQuery 1.7 and below, due to the fact that `jasmine-jquery` uses methods that were introduced in jQuery 1.8.


The Module Pattern
------------------

> _Modules are an integral piece of any robust application's architecture and typically help in keeping the units of code for a project both cleanly separated and organized._
>
> [Learning JavaScript Design Patterns - Addy Osmani]

Following a simple example on how to use the Module pattern with jCreate.

```javascript
var helloWorldComponent = (function () {

    var   module         = {}
        , _componentName = 'hello-world'
    ;

    var _privateMethod = function() {
        // ...
    }

    module.publicMethod = function() {
        console.log( _privateVariable );
    };

    $(document).on('create', '[data-component~="' + _componentName + '"]', function( e ) {
        module.publicMethod(); //= Hello World!
    });

    return module;
})();

helloWorldComponent.publicMethod(); //= Hello World!
```


Development
-----------

### Install Grunt and Bower

To install Grunt and Bower, you must first download and install [node.js] - which includes npm.

Then, using the command line:

```sh
# install `grunt-cli` globally
npm install -g grunt-cli

# install `bower` globally
npm install -g bower

# navigate to the root of your project, then run
npm install
bower install
```


### Available Grunt tasks

* `jshint`  Validate files with [JSHint].
* `jasmine` Run [jasmine] specs headlessly through PhantomJS.
* `uglify`  Minify files with [UglifyJS].
* `watch`   Run predefined tasks whenever watched files change.
* `sync`    Synchronize content of two directories.
* `test`    Alias for "jshint", "jasmine" tasks.
* `build`   Alias for "test", "uglify", "sync" tasks.

[Bower]: <http://bower.io/>
[jQuery Event Delegation]: <http://api.jquery.com/on/#direct-and-delegated-events>
[node.js]: <https://nodejs.org/>
[CodePen]: <http://codepen.io/marcomontalbano/details/pEjWgW>
[download and install node.js]: <https://nodejs.org/>

[Learning JavaScript Design Patterns - Addy Osmani]: <https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript>

[JSHint]:   <https://www.npmjs.com/package/grunt-contrib-jshint>
[jasmine]:  <https://www.npmjs.com/package/grunt-contrib-jasmine>
[UglifyJS]: <https://www.npmjs.com/package/grunt-contrib-uglify>
