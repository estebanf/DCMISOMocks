import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
export class MainController {
  logs = [];
  batchs = [];
  isos = [];

  /*@ngInject*/
  constructor($http, $scope, socket,$uibModal) {
    this.$http = $http;
    this.socket = socket;
    this.modal = $uibModal;
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('log');
      socket.unsyncUpdates('batchtracking');
      socket.unsyncUpdates('isotracking');
    });
  }
  openModal() {
    var modalInstance = this.modal.open({
      templateUrl: 'batchModalContent.html',
      size:'lg',
      controller:'BatchController'
    });
    modalInstance.result.then(data => {
      this.$http.post('/api/batch',data);
    },function(){

    })
  }
  openIsoModal(iso) {
    var modalInstance = this.modal.open({
      templateUrl: 'isoModalContent.html',
      size:'lg',
      controller:'IsoController',
      resolve: {
        iso: function() {
          return iso;
        }
      }
    });
    modalInstance.result.then(data => {
      
    },function(){

    })    
  }
  sendIsoResponse(iso){
    this.$http.put('/api/iso/' + iso.requestid, {});
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
    this.$http.get('/api/isotracking')
      .then(response => {
        this.isos = response.data;
        this.socket.syncUpdates('isotracking',this.isos)
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
