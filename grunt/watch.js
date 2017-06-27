module.exports = {
    scripts: {
        files: [
            '<%= files.specs %>'   ,
            '<%= files.srcs %>'    ,
            '<%= files.helpers %>' ,
        ],
        tasks: ['build'],
        options: {
            spawn: false,
        },
    },
};
