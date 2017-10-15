import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  logs = []
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('log');
    });
  }

  $onInit() {
    this.$http.get('/api/logs')
      .then(response => {
        this.logs = response.data;
        this.socket.syncUpdates('log', this.logs);
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
