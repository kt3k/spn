module.exports = config => config.set({
  frameworks: ['mocha', 'browserify'],
  files: ['src/__tests__/helper.js', 'src/**/__tests__/**/*.js'],
  preprocessors: {'src/**/*.js': ['browserify']},
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
