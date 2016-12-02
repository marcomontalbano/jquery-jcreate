module.exports = {
    scripts: {
        files: [
            '<%= files.spec %>'   ,
            '<%= files.src %>'    ,
            '<%= files.helper %>' ,
        ],
        tasks: ['build'],
        options: {
            spawn: false,
        },
    },
};
