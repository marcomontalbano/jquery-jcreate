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
        
    };

    // require it at the top and pass in the grunt instance
    require('time-grunt')(grunt);

    // 
    require('load-grunt-config')(grunt, {
        data : data,
    });
};
