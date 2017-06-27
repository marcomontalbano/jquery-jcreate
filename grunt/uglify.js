module.exports = {
    all: {
        options: {
            sourceMap : true,
            banner: ''
                  + '/**\n'
                  + ' * <%= package.filename %>.js v<%= package.version %> - <%= grunt.template.today("yyyy-mm-dd") %> - <%= package.firstRelease %>\n'
                  + ' * <%= package.author.name %> - <%= package.author.url %>\n'
                  + ' * --------------------------------------------------\n'
                  + ' */\n'
          },
        files: {
            '<%= files.dist_min %>': [ '<%= files.srcs %>' ]
        },
    },
};
