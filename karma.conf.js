// Karma configuration file

module.exports = function (config) {
  'use strict';

  config.set({
    autoWatch: true,
    basePath: '',
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],
    files: [
      'index.js',
      'test/*.js'
    ],
    frameworks: [
      'commonjs',
      'jasmine'
    ],
    preprocessors: {
      'index.js': ['commonjs'],
      'test/*.js': ['commonjs']
    },
    reporters: [process.env.TRAVIS ? 'dots' : 'progress'],
    singleRun: false
  });
};
