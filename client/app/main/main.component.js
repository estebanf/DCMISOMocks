import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  logs = [];
  batchs = [];
  isos = [];
  isoresponses = [];
  activities = [];
  diaries = [];

  /*@ngInject*/
  constructor($http, $scope, socket, $uibModal) {
    this.$http = $http;
    this.socket = socket;
    this.modal = $uibModal;
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('log');
      socket.unsyncUpdates('batchtracking');
      socket.unsyncUpdates('isotracking');
      socket.unsyncUpdates('isoresponsetracking');
      socket.unsyncUpdates('activities');
      socket.unsyncUpdates('diaries');
    });
  }

  openModal() {
    var modalInstance = this.modal.open({
      templateUrl: 'batchModalContent.html',
      size: 'lg',
      controller: 'BatchController'
    });
    modalInstance.result.then(data => {
      this.$http.post('/api/batch', data);
    }, function () {

    })
  }

  hasResponses(iso) {
    var obj = this.isoresponses.filter(function (item) {
      return iso.caseid == item.caseid;
    })
    return obj.length > 0;
  }

  openIsoModal(iso) {
    var modalInstance = this.modal.open({
      templateUrl: 'isoModalContent.html',
      size: 'lg',
      controller: 'IsoController',
      resolve: {
        iso: function () {
          return iso;
        }
      }
    });
    modalInstance.result.then(data => {

    }, function () {

    })
  }

  sendIsoResponse(iso) {
    this.$http.put('/api/iso/' + iso.requestid, {});
  }

  sendIsoScoreModal(isoResponse) {
    var modalInstance = this.modal.open({
      templateUrl: 'isoScoreModalContent.html',
      size: 'lg',
      controller: 'IsoScoreController',
      resolve: {
        isoresponse: function() {
          return isoResponse;
        }
      }
    });
    modalInstance.result.then(data => {
      this.$http.post('/api/isoscore', data);
    }, function() {

    });
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
        this.socket.syncUpdates('batchtracking', this.batchs);
      });
    this.$http.get('/api/isotracking')
      .then(response => {
        this.isos = response.data;
        this.socket.syncUpdates('isotracking', this.isos)
      });
    this.$http.get('/api/isoresponsetracking')
      .then(response => {
        this.isoresponses = response.data;
        console.log(this.isoresponses);
        this.socket.syncUpdates('isoresponsetracking', this.isoresponses)
      });
    this.$http.get('/api/activities')
      .then(response => {
        this.activities = response.data;
        this.socket.syncUpdates('activities', this.activities)
      });
    this.$http.get('/api/diaries')
      .then(response => {
        this.diaries = response.data;
        console.log(this.diaries);
        this.socket.syncUpdates('diaries', this.diaries)
      });
  }
}

export default angular.module('dcmisomocksApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.pug'),
    controller: MainController
  })
  .name;
