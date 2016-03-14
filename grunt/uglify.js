module.exports = {
    all: {
        options: {
            banner: ''
                  + '/**\n'
                  + ' * <%= package.filename %>.js v<%= package.version %> - <%= grunt.template.today("yyyy-mm-dd") %> - <%= package.firstRelease %>\n'
                  + ' * <%= package.author.name %> - <%= package.author.url %>\n'
                  + ' * --------------------------------------------------\n'
                  + ' */\n'
          },
        files: {
            'dist/<%= package.filename %>.min.js': [ '<%= files.src %>' ]
        },
    },
};
