'use strict';

import jsonpatch from 'fast-json-patch';
import fs from 'fs';
import uuid from 'uuid'
import request from 'request';
import config from '../../config/environment';

var content = null;
var contentResponse = null;
fs.readFile('server/api/iso/ISOACK.xml','utf8',function(err,data){
  content = data;
});
fs.readFile('server/api/iso/ISOResponse.xml','utf8',function(err,data){
  contentResponse = data;
});

var xpath = require('xpath')
var dom = require('xmldom').DOMParser

export function create(req, res) {

	var doc = new dom().parseFromString(req.rawBody);
	var select = xpath.useNamespaces({"Launchpoint":"http://www.example.org/Launchpoint"})
	var nodes = select("//Launchpoint:caseId",doc);
	var caseId= nodes[0].firstChild.data;
	var rqUID = uuid.v4();
	var body = content.replace(/00000/g,caseId);
	body = body.replace(/XXXXX/g,rqUID);
	res.status(200);
	res.header("Content-Type","application/xml");
	res.send(body);
}

export function upsert(req, res) {
	var id = req.params.id;
	var body = contentResponse.replace(/00000/g,id);
	request({
		url:config.bpm.uri + 'ode/processes/LaunchPointProcess_Processes_Core_ProcessISOResponse_ISO_Response_Manager_ISO',
		headers:{
			'Content-Type': 'text/xml; charset=utf-8'
		},
		method:'POST',
		body:body
	},function(err,resp,data){
		if(err){
		}
		else{
			res.status(200);
			res.send({});
		}
	});
}
