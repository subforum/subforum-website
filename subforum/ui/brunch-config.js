module.exports = {
  paths: {
    public: 'static',
    watched: ['src']
  },

  files: {
    javascripts: {
      joinTo: {
        'js/vendor.js': /^(?!src)/,
        'js/app.js': /^src/
      }
    },
    stylesheets: {joinTo: 'stylesheets/app.css'}
  },

  plugins: {
    babel: {presets: ['es2015', 'react']}
  },

  // nameCleaner: (function(_this) {
  //   return function(path) {
  //     return path.replace(/^src\/initialize\//, 'src');
  //   };
  // })(this)
};
