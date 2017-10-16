import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
export class MainController {
  logs = [];
  batchs = [];

  /*@ngInject*/
  constructor($http, $scope, socket,$uibModal) {
    this.$http = $http;
    this.socket = socket;
    this.modal = $uibModal;
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('log');
    });
  }
  openModal() {
    var modalInstance = this.modal.open({
      templateUrl: 'batchModalContent.html',
      size:'lg',
      controller:'BatchController'
    }).result.then(function(data){
      console.log(data);
    },function(){

    })
  }
  $onInit() {
    this.$http.get('/api/logs')
      .then(response => {
        this.logs = response.data;
        this.socket.syncUpdates('log', this.logs);
      });
    this.$http.get('/api/batchtracking')
      .then(response => {
        this.batchs = response.data;
        this.socket.syncUpdates('batchtracking',this.batchs);
      })
  }
}

export default angular.module('dcmisomocksApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.pug'),
    controller: MainController
  })
  .name;
