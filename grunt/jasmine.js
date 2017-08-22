module.exports = function (grunt, options) {

    // 
    var _exports = {
        options : {

            // Non-source, non-spec helper files.
            // In the default runner these are loaded after vendor files
            helpers : [
                '<%= files.helpers %>'
            ],

            // Your Jasmine specs.
            specs : [
                '<%= files.specs %>'
            ],

            junit : {
                // Path to output JUnit xml
                path: 'output/testresults',
            },

            // The auto-generated specfile that phantomjs will use to run your tests.
            // Automatically deleted upon normal runs. Use the :build flag to generate a SpecRunner manually e.g. grunt jasmine:myTask:build
            outfile : 'index.html',

            // Prevents the auto-generated specfile used to run your tests from being automatically deleted.
            keepRunner : true,

            template: require('grunt-template-jasmine-istanbul'),

            templateOptions: {
                coverage: 'coverage/coverage.json',
                report: [
                    {
                        type: 'html',
                        options: {
                            dir: 'coverage/html'
                        }
                    },
                    {
                        type: 'lcov',
                        options: {
                            dir: 'coverage/reports'
                        }
                    },
                    {
                        type: 'cobertura',
                        options: {
                            dir: 'coverage/cobertura'
                        }
                    },
                    {
                        type: 'text-summary'
                    }
                ]
            }
        },

        // // Your source files.
        //src : '<%= files.srcs %>',
    };


    for ( var _jquery_version in options.bower.devDependencies )
    {
        if ( options.bower.devDependencies.hasOwnProperty( _jquery_version ) )
        {
            if ( /^jquery-[0-9\.]+$/.test( _jquery_version ) )
            {
                // Test against jQuery x.x.x
                var _jquery_path = 'bower_components/' + _jquery_version + '/';
                var _jquery_file = grunt.file.exists(_jquery_path + 'jquery.js') ? _jquery_path + 'jquery.js' : _jquery_path + 'dist/jquery.js';

                _exports[ _jquery_version ] = {

                    // Your source files.
                    src: '<%= files.srcs %>',

                    options: {

                        // Third party libraries like jQuery & generally anything loaded before source, specs, and helpers.
                        vendor: [
                            _jquery_file,
                            'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
                            'lib/jasmine-jquery-config.js',
                        ],
                    },
                };
            }
        }
    }

    return _exports;

};
