module.exports = {
    scripts: {
        files: [
            '<%= files.spec %>'   ,
            '<%= files.src %>'    ,
            '<%= files.helper %>' ,
        ],
        tasks: ['test'],
        options: {
            spawn: false,
        },
    },
};
