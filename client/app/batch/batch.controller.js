'use strict';
const angular = require('angular');


/*@ngInject*/
export function batchController($scope, $uibModalInstance,uuid) {
  $scope.batch = {
    BatchId: uuid.v4(),
    EnvironmentId: 1,
    ClientId: Math.floor((Math.random()*100)+1),
    TotalCaseCount: 0,
    Cases: []
  }
  $scope.doc = JSON.stringify($scope.batch,undefined,4)
  $scope.newCase = {
    isoIndicator:"",
    score:"",
    FundingSource:""
  }
  $scope.randomCase = function(){
    var random = Math.floor((Math.random()*10)+1);
    var randomX = Math.floor((Math.random()*10)+1);
    $scope.newCase.isoIndicator= (random >= 5) ? "1" : "0"
    $scope.newCase.score = Math.floor((Math.random()*100)+50);
    $scope.newCase.FundingSource = (randomX >= 5) ? "Medicaid" : "Other"
  }
  $scope.addCase =function(){
    var addCase = {
      CaseId: uuid.v4(),
      ISOIndicator: $scope.newCase.isoIndicator,
      Score: $scope.newCase.score,
      AccidentDate:"2017-10-10T16:38:49-06:00",
      BenefitAmount:"5000",
      FundingSource:$scope.newCase.FundingSource,
      LOB:"Health",
      State:"CO",
      WorkComp:false,
      CaseStatus:"Investigate",
      CaseSource:"Generated",
      SkipDuplicateCheck : false      
    }
    $scope.batch.Cases.push(addCase);
    $scope.batch.TotalCaseCount = $scope.batch.TotalCaseCount + 1;
    $scope.doc = JSON.stringify($scope.batch,undefined,4)
    $scope.newCase = {
      isoIndicator:"",
      score:"",
      FundingSource:""
    } 
     
  }

  $scope.ok = function(){
    $uibModalInstance.close($scope.batch);
  }
  $scope.cancel = function(){
    $uibModalInstance.dismiss('cancel');
  }
}

export default angular.module('dcmisomocksApp.batch', [])
  .controller('BatchController', batchController)
  .name;