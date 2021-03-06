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
      socket.unsyncUpdates('Activity');
      socket.unsyncUpdates('diary');
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
  hasDiaries(iso){
    var obj = this.diaries.filter(function (item) {
      return iso.caseid == item.CaseId;
    })
    return obj.length > 0;
  }
  hasActivities(iso){
    var obj = this.activities.filter(function (item) {
      return iso.caseid == item.CaseId;
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

    });
  }
    openIqModal(iq)
    {
      var modalInstance = this.modal.open({
        templateUrl: 'iqModalContent.html',
        size: 'lg',
        controller: 'IqController',
        resolve: {
          iq: function () {
            return iq;
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
    this.$http.get('/api/iqtracking')
      .then(response => {
        this.iqs = response.data;

        this.socket.syncUpdates('iqtracking', this.iqs);
      });
    this.$http.get('/api/isoresponsetracking')
      .then(response => {
        this.isoresponses = response.data;
        this.socket.syncUpdates('isoresponsetracking', this.isoresponses)
      });
    this.$http.get('/api/activities')
      .then(response => {
        this.activities = response.data;
        this.socket.syncUpdates('Activity', this.activities)
      });
    this.$http.get('/api/diaries')
      .then(response => {
        this.diaries = response.data;
        this.socket.syncUpdates('diary', this.diaries)
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
