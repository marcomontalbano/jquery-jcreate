module.exports = {
    options: {
        banner: ''
              + '/**\n'
              + ' * <%= package.filename %>.js v<%= package.version %>\n'
              + ' * <%= package.author.name %> © 2011-<%= grunt.template.today("yyyy") %> - <%= package.author.url %>\n'
              + ' * ----------------------------------------------------------\n'
              + ' */\n'
    },
    beautify: {
        options: {
            beautify: true,
            mangle: false,
            compress: false,
        },
        files: {
            '<%= files.dist %>': [ '<%= files.srcs %>' ]
        },
    },
    minify: {
        options: {
            sourceMap: true,
        },
        files: {
            '<%= files.dist_min %>': [ '<%= files.srcs %>' ]
        },
    },
};
