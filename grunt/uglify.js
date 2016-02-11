module.exports = {
    minified: {
        options: {
            banner: ''
                  + '/**\n'
                  + ' * <%= package.filename %>.js - v<%= package.version %> (last dist: <%= grunt.template.today("yyyy-mm-dd") %>)\n'
                  + ' * <%= package.author.name %> <<%= package.author.email %>>\n'
                  + ' * -------------------------------------------------\n'
                  + ' */\n'
          },
        files: {
            'dist/<%= package.filename %>.min.js': [ '<%= files.src %>' ]
        },
    },
};
