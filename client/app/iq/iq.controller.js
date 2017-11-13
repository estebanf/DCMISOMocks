'use strict';
const angular = require('angular');

/*@ngInject*/
export function iqController($scope, $http, $uibModalInstance, iq) {
    $scope.doc = JSON.stringify(iq).replace(/\,/g,",\n");
    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel');
    }
    $scope.ok = function(){
	    $http.post('/api/activities/1', {
        ClientId: iq.clientid,
        CaseId: iq.caseid,
        CreatedBy: "BPM",
        ActivityType: "IQ Response",
        ActivityCode: String,
        Description: String
      }).then(function(){
	    		$uibModalInstance.close();

	    	})
    }
}

export default angular.module('dcmisomocksApp.iq', [])
  .controller('IqController', iqController)
  .name;
