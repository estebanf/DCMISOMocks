'use strict';

import jsonpatch from 'fast-json-patch';
import request from 'request';
import _ from 'lodash';
import {EventEmitter} from 'events';
import config from '../../config/environment';

var LogEvents = new EventEmitter();
// LogEvents.setMaxListeners(0);

var isos = [];
function loadIsos(cb){
  request(config.api.uri + 'api/ISOCases',function(error,response,body){
  	var data =  _.map(JSON.parse(body),function(obj){
  		obj._id = obj.parentpid + "-" + obj.caseid;
  		return obj;
  	})
  	cb(data);
  });
}
loadIsos(function(data){
 	isos = data;
 });
function checkBatches(){
	loadIsos(function(data){
		var new_isos = data;

		//UPdates
		_.each(isos,function(obj){
			var existingId = _.findIndex(new_isos,function(o) { return (o._id == obj._id) && !(_.isEqual(obj,o)) })
			if(existingId >= 0){
				obj = new_isos[existingId];
				LogEvents.emit("save:" + obj._id,obj);
				LogEvents.emit("save",obj);
			}
		})
		var del_elements = _.differenceWith(isos,new_isos,_.isEqual);
		var new_elements = _.differenceWith(new_isos,isos,_.isEqual);

		if(del_elements && del_elements.length > 0){
			_.each(del_elements,function(obj){
				LogEvents.emit("remove:" + obj._id,obj);
				LogEvents.emit("remove",obj);
			})
			isos = _.xor(isos,del_elements);
		}
		if(new_elements && new_elements.length > 0){
			_.each(new_elements,function(obj){
				LogEvents.emit("save:" + obj._id,obj);
				LogEvents.emit("save",obj);
			})
			isos = _.union(isos,new_elements);
		}
	});
}

setInterval(checkBatches,5000);
export function index(req, res) {
	res.status(200);
	res.header("Content-Type","application/json");
	res.send(isos);
}

export default LogEvents;
