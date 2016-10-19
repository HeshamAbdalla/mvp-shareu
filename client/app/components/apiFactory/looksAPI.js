(function() {
  'use strict';

  angular
    .module('app')
    .factory('looksAPI', looksAPI);
    looksAPI.$inject = ['$http'];
    function looksAPI($http) {
      return {
        createScrapeLook: createScrapeLook,
        getAllImages: getAllImages
      }

      function getAllImages () {
        return $http.get('/api/look/getAllImages',{
          cache: true
        });
      }
      function createScrapeLook(look) {
        return $http.post('/api/look/scrapeUpload', look)
      }
    }
})();
