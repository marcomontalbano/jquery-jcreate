[![Bower](https://badge.fury.io/bo/jquery-jcreate.svg)](https://github.com/marcomontalbano/jquery-jcreate/releases/latest)
[![Build Status](https://travis-ci.org/marcomontalbano/jquery-jcreate.svg?branch=master)](https://travis-ci.org/marcomontalbano/jquery-jcreate)
[![Codacy](https://api.codacy.com/project/badge/Grade/16809335d05c4b82b5e656de74875ea9)](https://www.codacy.com/app/marcomontalbano/jquery-jcreate)

jCreate
=======

jCreate is a plugin for jQuery that adds a new bindable event. Did you ever look for something like `$(document).on("create", function() { ... });`?

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
$( '#dataTable tbody' ).on( 'create', 'tr', function( event ) {
    console.log( event.$currentTarget.text() );
});

// add a new 'row'.
$( '#dataTable tbody' ).append('<tr><td>this is a new row!</td></tr>');
```

### Event

* **type** - Describes the nature of the event.
```javascript
$( document ).on('create', 'a', function( event ) {
    console.log( event.type ); //= "create"
});
```

* **timeStamp** - The difference in milliseconds between the time the browser created the event and January 1, 1970.

* **currentTarget** - The current DOM element within the event bubbling phase.
```javascript
$( document ).on('create', 'a', function( event ) {
    console.log( event.currentTarget === this ); //= true
});
```

* **$currentTarget** - The current DOM element within the event bubbling phase as jQuery object.
```javascript
$( document ).on('create', 'a', function( event ) {
    console.log( event.$currentTarget.is( $(this) ) ); //= true
});
```

* **delegateTarget** - The element where the currently-called jQuery event handler was attached.
```javascript
$( document ).on('create', 'a', function( event ) {
    console.log( event.delegateTarget === document ); //= true
});
```

* **$delegateTarget** - The jQuery element where the currently-called jQuery event handler was attached.
```javascript
$( document ).on('create', 'a', function( event ) {
    console.log( event.$delegateTarget.is( $(document) ) ); //= true
});
```

* **options** - Method that filters data by key.
```html
<div data-component-name="hello-world"></div>
```
```javascript
$( document ).on('create', 'div', function( event ) {
    console.log( event.options('component') ); //= {name:"hello-world"}
});
```

### jQuery Support

> jquery >= 1.8

Since I use the last version of `jasmine-jquery` library in order to test my own plugin, I cannot ensure that the plugin works with jQuery 1.7 and below, due to the fact that `jasmine-jquery` uses methods that were introduced in jQuery 1.8.


The Module Pattern
------------------

> _Modules are an integral piece of any robust application's architecture and typically help in keeping the units of code for a project both cleanly separated and organized._
>
> [Learning JavaScript Design Patterns - Addy Osmani]

```javascript
var myModule = (function () {

    var   module           = {}
        , _privateVariable = 'Hello World'
    ;

    var _privateMethod = function() {
        // ...
    };

    module.publicProperty = 'Foobar';
    module.publicMethod = function () {
        console.log( _privateVariable );
    };

    return module;

}());
```

Here follows a simple example on how to use the Module pattern with jCreate.

```html
<div data-component="hello-world" data-hello-world-name="Marco"></div>
```

```javascript
var helloWorldComponent = (function () {

    var   module         = {}
        , _componentName = 'hello-world'
    ;

    module.greeting = function( name ) {
        console.log( 'Hello ' + name + '!' );
    };

    $(document).on('create', '[data-component~="' + _componentName + '"]', function( event ) {
        var options = event.options( _componentName ); //= {name:"Marco"}
        module.greeting( options.name );               //= Hello Marco!
    });

    return module;
}());

helloWorldComponent.greeting('Marco'); //= Hello Marco!
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
