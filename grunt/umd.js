module.exports = {
    options: {
        deps: {
            default: ['jquery'],
        }
    },
    src: {
        options: {
            src: '<%= files.dist %>',
            dest: '<%= files.dist_umd %>'
        }
    }
};
