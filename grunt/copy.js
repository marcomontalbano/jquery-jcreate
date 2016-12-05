module.exports = {
    src: {
        files: [{
            expand: true,
            cwd: 'src/',
            src: ['**'],
            dest: 'dist/'
        }],
        verbose: true
    }
};
