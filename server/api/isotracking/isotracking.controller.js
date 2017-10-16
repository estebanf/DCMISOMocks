'use strict';

import jsonpatch from 'fast-json-patch';
import request from 'request';
import _ from 'lodash';
import {EventEmitter} from 'events';

var LogEvents = new EventEmitter();
LogEvents.setMaxListeners(0);

var isos = [];
function loadIsos(cb){
  request('http://bpms.everteam.us:3005/api/ISOCases',function(error,response,body){
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
function logCase(l,o){
	console.log("---" + l + "---")
	console.log(JSON.stringify(_.map(o,function(obj){
		return {
			_id:obj._id,
			batchid: obj.batchid,
			caseid:obj.caseid
		}
	})))
}
function checkBatches(){
	loadIsos(function(data){
		var new_isos = data;

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