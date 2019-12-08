const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    content: './src/content_scripts/main',
    background: './src/background/background',
  },
  output: {
    path: path.resolve(__dirname, 'washoe'), // string
  },
};
