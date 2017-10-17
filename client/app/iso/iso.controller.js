'use strict';
const angular = require('angular');

/*@ngInject*/
export function isoController($scope, $uibModalInstance,iso) {
    $scope.doc = JSON.stringify(iso).replace(/\,/g,",\n");
    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel');
    }
}

export default angular.module('dcmisomocksApp.iso', [])
  .controller('IsoController', isoController)
  .name;
