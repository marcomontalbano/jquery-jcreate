module.exports = {
    build: {
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
    smoke_test: {
        files: [
            '<%= files.specs %>'   ,
            '<%= files.srcs %>'    ,
            '<%= files.helpers %>' ,
        ],
        tasks: ['smoke_test'],
        options: {
            spawn: false,
        },
    },
};
