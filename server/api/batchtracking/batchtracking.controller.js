'use strict';

import jsonpatch from 'fast-json-patch';
import request from 'request';
import _ from 'lodash';
import {EventEmitter} from 'events';

var LogEvents = new EventEmitter();
LogEvents.setMaxListeners(0);

var batches = [];
var keys = [];
function loadBatches(cb){
  request('http://bpms.everteam.us:3005/api/batchtrackings',function(error,response,body){
  	var data =  _.map(JSON.parse(body),function(obj){
  		obj._id = obj.pid;
  		return obj;
  	})
  	cb(data);
  });
}
loadBatches(function(data){
 	batches = data;
 	keys = _.keys(batches);
 });
function checkBatches(){
	loadBatches(function(data){
		var new_batches = data;
		var del_elements = _.differenceWith(batches,new_batches,_.isEqual);
		var new_elements = _.differenceWith(new_batches,batches,_.isEqual);
		if(del_elements && del_elements.length > 0){
			_.each(del_elements,function(obj){
				LogEvents.emit("remove:" + obj.pid,obj);
				LogEvents.emit("remove",obj);
			})
			batches = _.xor(batches,del_elements);
		}
		if(new_elements && new_elements.length > 0){
			_.each(new_elements,function(obj){
				LogEvents.emit("save:" + obj.pid,obj);
				LogEvents.emit("save",obj);
			})
			batches = _.union(batches,new_elements);
		}
	});
}

setInterval(checkBatches,5000);
export function index(req, res) {
	res.status(200);
	res.header("Content-Type","application/json");
	res.send(batches);
}

export default LogEvents;