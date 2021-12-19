const path = require('path');

module.exports = {
    entry:'script1.js',
    output: {
        filename:'script2.js',
        path: path.resolve(_dirname, 'dist'),
    },
};