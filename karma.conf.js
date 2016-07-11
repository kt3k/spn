module.exports = config => config.set({
  frameworks: ['mocha', 'chai', 'browserify'],
  files: ['spec/helper.js', 'spec/**/*.js'],
  preprocessors: {'spec/**/*.js': ['browserify']},
  browserify: {
    debug: true,
    transform: [['babelify', {presets: ['es2015'], plugins: ['istanbul']}]]
  },
  reporters: ['progress', 'coverage'],
  coverageReporter: {type: 'lcov'},
  port: 9876,
  logLevel: config.LOG_INFO,
  autoWatch: false,
  browsers: ['Chrome'],
  singleRun: true,
  concurrency: Infinity
})
