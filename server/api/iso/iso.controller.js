'use strict';

import jsonpatch from 'fast-json-patch';
import fs from 'fs';
import uuid from 'uuid'

var content = null;
fs.readFile('server/api/iso/ISOACK.xml','utf8',function(err,data){
  content = data;
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