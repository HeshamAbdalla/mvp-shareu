(function() {
  'use strict';

  angular
  .module('app')
  .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$state','$modal','looksAPI','scrapeAPI', 'Auth'];

  function MainCtrl($scope, $state, $modal, looksAPI,scrapeAPI, Auth) {
    $scope.user = Auth.getCurrentUser();
    $scope.look = {}
    $scope.looks = [];
    $scope.scrapePostForm = true;
    $scope.uploadLookTitle = true;
    $scope.uploadLookForm = false;
    $scope.showScrapeDetails = false;
    $scope.gotScrapeResults = false;
    $scope.loading = false;

    var myModal = $modal({
      scope: $scope,
      show: false
    });

    $scope.showModal = function(){
      myModal.$promise.then(myModal.show);
    }
    $scope.$watch('look.link', function(newVal, oldVal){
      if(newVal.length > 5) {
        $scope.loading = true;
        var link = {
          url: $scope.look.link
        };
        scrapeAPI.getScrapeDetails(link)
        .then(function(data){
          console.log(data);
          $scope.showScrapeDetails = true;
          $scope.gotScrapeResults = true;
          $scope.uploadLookTitle = false;
          $scope.look.imgThumb = data.data.img;
          $scope.look.description = data.data.desc;
        })
        .catch(function(data){
          console.log("Error")
          $scope.loading = false;
          $scope.look.link = "";
          $scope.gotScrapeResults = false;
        })
        .finally(function(){
          $scope.loading = false;
          $scope.uploadLookForm = false;
        })
      }
    });
    $scope.addScrapePost = function(){
      var look = {
        description: $scope.look.description,
        title: $scope.look.title,
        image: $scope.look.imgThumb,
        linkURL: $scope.look.link,
        email: $scope.user.email,
        name: $scope.user.name,
        _creator: $scope.user._id
      }
      looksAPI.createScrapeLook(look)
      .then(function(data){
        $scope.showScrapeDetails = false;
        $scope.gotScrapeResults = false;
        $scope.look.title = "";
        $scope.look.link = "";
        $scope.looks.splice(0,0, data.data);
        console.log(data);

      })
      .catch(function(){
        console.log('error posting > Upload');
        console.log(look);
        $scope.showScrapeDetails = false;
      });
    }
  }
})();
