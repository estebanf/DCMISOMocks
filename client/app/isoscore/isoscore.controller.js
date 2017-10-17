'use strict';
const angular = require('angular');


/*@ngInject*/
export function isoScoreController($scope, $uibModalInstance, isoresponse) {
  $scope.doc = JSON.stringify(isoresponse).replace(/\,/g,",\n");
  $scope.newScore = {
    status: "",
    score: ""
  };


  $scope.ok = function () {
    console.log("Submitted " + JSON.stringify($scope.newScore));
    $uibModalInstance.close($scope.newScore);
  };
  $scope.cancel = function () {
    console.log("Cancelled");
    $uibModalInstance.dismiss('cancel');
  };
}

export default angular.module('dcmisomocksApp.isoscore', [])
  .controller('IsoScoreController', isoScoreController)
  .name;
