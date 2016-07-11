module.exports = config => config.set({
  frameworks: ['mocha', 'browserify'],
  files: ['test/helper.js', 'test/**/*.js'],
  preprocessors: {'test/**/*.js': ['browserify']},
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
