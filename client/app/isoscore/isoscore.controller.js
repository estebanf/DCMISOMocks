'use strict';
const angular = require('angular');


/*@ngInject*/
export function isoScoreController($scope, $uibModalInstance, isoresponse) {
  $scope.doc = JSON.stringify(isoresponse).replace(/\,/g,',\n');
  $scope.newScore = {
    caseId: isoresponse.caseid,
    status: '',
    score: ''
  };


  $scope.ok = function() {
    $uibModalInstance.close($scope.newScore);
  };
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
}

export default angular.module('dcmisomocksApp.isoscore', [])
  .controller('IsoScoreController', isoScoreController)
  .name;
