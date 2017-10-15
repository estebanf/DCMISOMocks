'use strict';

import jsonpatch from 'fast-json-patch';
import fs from 'fs';

var content = null;
fs.readFile('server/api/generateFile/ISORequest.xml','utf8',function(err,data){
	console.log(err);
  content = data;
});

export function create(req, res) {
	res.status(200);
	res.header("Content-Type","application/json");
	res.send("OK");
}