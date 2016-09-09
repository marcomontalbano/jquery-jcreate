module.exports = function(grunt)
{ 
    var data = {

        //
        files : {
            src    : 'src/**/*.js',
            spec   : 'spec/**/*.spec.js',
            helper : 'spec/helpers/**/*.helper.js',
        },

        //
        bower : grunt.file.readJSON('bower.json'),

        //
    };

    // require it at the top and pass in the grunt instance
    require('time-grunt')(grunt);

    // 
    require('load-grunt-config')(grunt, {
        data : data,
    });
};
