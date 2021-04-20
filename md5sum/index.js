// import exec module from child_process to run shell command
// spawn was recommended for long output, but md5sum is short, so exec is ok
const { exec } = require("child_process");

exports.handler = (event, handler, callback) => {

    //var input = "test"
    var input = event.queryStringParameters.input.trim();

    // command to compute md5 of provided input
    // md5sum requires stdin, so this echos and pipes the value to md5sum
    // added sed to remove the trailing " -" that md5sum adds to output
    // added -n because echo includes a newline, causing md5sum to be wrong
    var cmd = 'echo -n "' + input + '" | md5sum | sed "s/ -//"';

    // execute the full command
    exec(cmd, (error, stdout, stderr) => {

        // there was an error, so return the error message
        if (error) {
            callback(null, {
                statusCode: 400,
                body: error
            });
        }

        // no lambda error, but the command failed, so return the error message
        if (stderr) {
            callback(null, {
                statusCode: 400,
                body: stderr
            });
        }

        // no errors, so return the md5 hash
        callback(null, {
            statusCode: 200,
            body: stdout.trim()
        });

    });
};
