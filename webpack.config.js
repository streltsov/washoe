const path = require('path');
const exec = require('child_process').exec;

module.exports = {
  mode: 'production',
  entry: {
    content: './src/content_scripts/main',
    background: './src/background/background',
  },
  output: {
    path: path.resolve(__dirname, 'washoe'), // string
  },
  plugins: [
    {
      apply: compiler => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', compilation => {
          exec(
            path.resolve(__dirname, 'package-script'),
            (err, stdout, stderr) => {
              if (stdout) process.stdout.write(stdout);
              if (stderr) process.stderr.write(stderr);
            },
          );
        });
      },
    },
  ],
};
