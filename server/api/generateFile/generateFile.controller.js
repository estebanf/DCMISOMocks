'use strict';

import jsonpatch from 'fast-json-patch';
import fs from 'fs';
import request from 'request';

var content = null;
fs.readFile('server/api/generateFile/ISORequest.xml','utf8',function(err,data){
	console.log(err);
  content = data;
});

function callBack(caseId){
	var body = content.replace(/00000/g,caseId);
	request({
		url:'http://bpms.everteam.us:8080/everteam/ode/processes/LaunchPointProcess_Processes_Core_ProcessISOCase_Process_ISO_Case_DCM',
		headers:{
			'Content-Type': 'text/xml; charset=utf-8'
		},
		method:'POST',
		body:body	
	},function(err,res,data){
		if(err){
			console.log(err);
		}
		else{
			console.log(data);
		}
	});
}

export function create(req, res) {
	res.status(200);
	res.header("Content-Type","application/json");
	res.send("OK");
	setTimeout(callBack,3000,req.body.case_id)
}