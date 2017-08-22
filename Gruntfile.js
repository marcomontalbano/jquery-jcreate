module.exports = function(grunt)
{ 
    var data = {

        //
        files : {
            srcs    : 'src/**/*.js',
            specs   : 'spec/**/*.spec.js',
            helpers : 'spec/helpers/**/*.helper.js',

            src          : 'src/<%= package.filename %>.js',
            dist         : 'dist/<%= package.filename %>.js',
            dist_min     : 'dist/<%= package.filename %>.min.js',
            dist_umd     : 'dist/<%= package.filename %>.umd.js',
        },

        //
        bower : grunt.file.readJSON('bower.json'),

        //
    };

    // require it at the top and pass in the grunt instance
    require('time-grunt')(grunt);

    // 
    require('load-grunt-config')(grunt, {
        data: data,
        loadGruntTasks: {
            pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
        },
    });
};

