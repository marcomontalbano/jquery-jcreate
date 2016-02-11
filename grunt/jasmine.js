// jQuery.
var _jqueries = {
    ////"jquery-1.6"  : "bower_components/jquery-1.6/jquery.js", // DOESN'T WORK
    ////"jquery-1.7"  : "bower_components/jquery-1.7/jquery.js", // DOESN'T WORK
    "jquery-1.8"  : "bower_components/jquery-1.8/jquery.js",
    "jquery-1.9"  : "bower_components/jquery-1.9/jquery.js",
    "jquery-1.10" : "bower_components/jquery-1.10/jquery.js",
    "jquery-1.11" : "bower_components/jquery-1.11/dist/jquery.js",
    //"jquery-1.12" : "bower_components/jquery-1.12/dist/jquery.js",
    "jquery-2.0"  : "bower_components/jquery-2.0/jquery.js",
    "jquery-2.1"  : "bower_components/jquery-2.1/dist/jquery.js",
    //"jquery-2.2"  : "bower_components/jquery-2.2/dist/jquery.js"
};

// 
var _exports = {
    options : {

        // Non-source, non-spec helper files.
        // In the default runner these are loaded after vendor files
        helpers : [
            '<%= files.helper %>'
        ],

        // Your Jasmine specs.
        specs : [
            '<%= files.spec %>'
        ],

        junit : {
            // Path to output JUnit xml
            path: 'output/testresults',
        },

        // The auto-generated specfile that phantomjs will use to run your tests.
        // Automatically deleted upon normal runs. Use the :build flag to generate a SpecRunner manually e.g. grunt jasmine:myTask:build
        outfile : 'SpecRunner.html',

        // Prevents the auto-generated specfile used to run your tests from being automatically deleted.
        keepRunner : true
    },

    // // Your source files.
    // src : '<%= files.spec %>',
};


for ( var _jquery_version in _jqueries )
{
    if( _jqueries.hasOwnProperty( _jquery_version ) )
    {
        // Test against jQuery x.x.x
        var _jquery_path = _jqueries[ _jquery_version ];

        _exports[ _jquery_version ] = {

            // Your source files.
            src: '<%= files.src %>',

            options: {

                // Third party libraries like jQuery & generally anything loaded before source, specs, and helpers.
                vendor: [
                    _jquery_path,
                    'lib/jasmine-jquery.js',
                    'lib/jasmine-jquery-config.js',
                ],
            },
        };
    }
}

module.exports = _exports;
