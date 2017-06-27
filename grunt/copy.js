module.exports = {
    src: {
        files: [{
            expand: true,
            cwd: 'src/',
            src: ['<%= package.filename %>.js'],
            dest: 'dist/',
            filter: 'isFile'
        }],
        verbose: true
    }
};
