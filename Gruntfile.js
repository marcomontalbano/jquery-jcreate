module.exports = function(grunt)
{ 
  // project configuration.
  grunt.initConfig(
  {
    jasmine : {
      // Your source files.
      src : [
        'src/*.js'
      ],
      options : {
        // Third party libraries like jQuery & generally anything loaded before source, specs, and helpers.
        vendor : [
          'lib/jquery-1.11.1.min.js',
          'lib/jasmine-jquery.js',
          'lib/jasmine-jquery-config.js',
        ],

        // Non-source, non-spec helper files.
        // In the default runner these are loaded after vendor files
        helpers : [
          'spec/helpers/*.js'
        ],

        // Your Jasmine specs.
        specs : [
          'spec/*.js'
        ],

        junit : {
          // Path to output JUnit xml
          path: 'output/testresults'
        },

        // The auto-generated specfile that phantomjs will use to run your tests.
        // Automatically deleted upon normal runs. Use the :build flag to generate a SpecRunner manually e.g. grunt jasmine:myTask:build
        outfile : 'SpecRunner.html',

        // Prevents the auto-generated specfile used to run your tests from being automatically deleted.
        keepRunner : true
      }
    }  
  });
  
  // https://www.npmjs.org/package/grunt-contrib-jasmine
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', [ 'jasmine' ]);
};
