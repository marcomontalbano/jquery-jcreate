module.exports = {
    version: {
        files: {
            'dist/': 'dist/**',
        },
        options: {
            replacements: [{
                pattern: /{{ VERSION }}/g,
                replacement: '<%= package.version %>'
            }]
        }
    }
};
