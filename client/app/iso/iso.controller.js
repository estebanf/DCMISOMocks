'use strict';
const angular = require('angular');

/*@ngInject*/
export function isoController($scope, $http,$uibModalInstance,iso) {
    $scope.doc = JSON.stringify(iso).replace(/\,/g,",\n");
    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel');
    }
    $scope.ok = function(){
	    $http.put('/api/iso/' + iso.requestid, {})
	    	.then(function(){
	    		$uibModalInstance.close();

	    	})
    }
}

export default angular.module('dcmisomocksApp.iso', [])
  .controller('IsoController', isoController)
  .name;
