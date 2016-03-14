jCreate
=======

jCreate is a plugin for jQuery that adds a new bindable event.

Now you can do something cool when one or more elements are created and are available on the page.

See it in action with [JSFiddle].


Install with Bower
------------------

You can install jCreate using [Bower]:

```sh
bower install jquery-jcreate
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

Development
-----------

### Install Grunt

To install Grunt, you must first download and install [node.js] (which includes npm).

Then, using the command line:

```sh
# install `grunt-cli` globally
npm install -g grunt-cli

# navigate to the root of your project, then run
npm install
bower install
```


### Available Grunt tasks

* `jshint`  Validate files with [JSHint].
* `jasmine` Run [jasmine] specs headlessly through PhantomJS.
* `uglify`  Minify files with [UglifyJS].
* `watch`   Run predefined tasks whenever watched files change.
* `test`    Alias for "jshint", "jasmine" tasks.
* `build`   Alias for "test", "uglify" tasks.

[Bower]: <http://bower.io/>
[jQuery Event Delegation]: <http://api.jquery.com/on/#direct-and-delegated-events>
[node.js]: <https://nodejs.org/>
[JSFiddle]: <http://jsfiddle.net/mmontalbano/97cnLqgm/>
[download and install node.js]: <https://nodejs.org/>

[JSHint]:   <https://www.npmjs.com/package/grunt-contrib-jshint>
[jasmine]:  <https://www.npmjs.com/package/grunt-contrib-jasmine>
[UglifyJS]: <https://www.npmjs.com/package/grunt-contrib-uglify>
