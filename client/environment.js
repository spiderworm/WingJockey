
;(function() {

  var es5Libs = [
    "three",
    "cannon"
  ];

  window.module = {};

  requirejs.config({
    baseUrl: '/',
    config: {
      es6: {
        resolveModuleSource: function(source) {
          if (
            es5Libs.indexOf(source) !== -1
          ) {
            return source;
          } else {
            return 'es6!' + source;
          }
        }
      }
    },
    shim: {
      'three': {
        exports: 'THREE'
      },
      'cannon': {
        exports: 'CANNON'
      }
    }
  });

})();
