module.exports = {
    options: {
        laxcomma : true, 
        loopfunc : true,

        '-W032': true,  // https://jslinterrors.com/unnecessary-semicolon
    },
    source : {
        files : {
            src: [ '<%= files.spec %>', '<%= files.src %>' ],
        },
    },
};
