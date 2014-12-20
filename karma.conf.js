module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'test/fixtures/**/*.html',
      'node_modules/htmlparser/lib/htmlparser.js',
      'vendor/simple-html-tokenizer.js',
      'src/**/*.js',
      'test/**/*_spec.js'
    ],
    browsers: ['PhantomJS'],
    autoWatch: true,
    singleRun: false,
    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    },
    preprocessors: {
      'test/fixtures/**/*.html': ['html2js']
    }
  });
};
