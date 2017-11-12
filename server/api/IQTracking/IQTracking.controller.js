'use strict';

import jsonpatch from 'fast-json-patch';
import request from 'request';
import _ from 'lodash';
import {EventEmitter} from 'events';
import config from '../../config/environment';

var LogEvents = new EventEmitter();
// LogEvents.setMaxListeners(0);

var iqs = [];
function loadIqs(cb){
  request(config.api.uri + 'api/iqtrackings',function(error,response,body){
    var data =  _.map(JSON.parse(body),function(obj){
      obj._id = obj.pid;
      return obj;
    })
    cb(data);
  });
}
loadIqs(function(data){
  iqs = data;
});
function checkIQs(){
  loadIqs(function(data){
    var new_iqs = data;

    //UPdates
    _.each(iqs,function(obj){
      var existingId = _.findIndex(new_iqs,function(o) { return (o._id == obj._id) && !(_.isEqual(obj,o)) })
      if(existingId >= 0){
        obj = new_iqs[existingId];
        LogEvents.emit("save:" + obj._id,obj);
        LogEvents.emit("save",obj);
      }
    })
    var del_elements = _.differenceWith(iqs,new_iqs,_.isEqual);
    var new_elements = _.differenceWith(new_iqs,iqs,_.isEqual);

    if(del_elements && del_elements.length > 0){
      _.each(del_elements,function(obj){
        LogEvents.emit("remove:" + obj._id,obj);
        LogEvents.emit("remove",obj);
      })
      iqs = _.xor(iqs,del_elements);
    }
    if(new_elements && new_elements.length > 0){
      _.each(new_elements,function(obj){
        LogEvents.emit("save:" + obj._id,obj);
        LogEvents.emit("save",obj);
      })
      iqs = _.union(iqs,new_elements);
    }
  });
}

setInterval(checkIQs,5000);
export function index(req, res) {
  res.status(200);
  res.header("Content-Type","application/json");
  res.send(iqs);
}

export default LogEvents;
