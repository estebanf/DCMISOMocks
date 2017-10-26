'use strict';

import jsonpatch from 'fast-json-patch';
import fs from 'fs';
import request from 'request';
import config from '../../config/environment';
import stomp from 'stomp';

var content = null;
fs.readFile('server/api/generateFile/ISORequest.xml','utf8',function(err,data){
  content = data;
});

function callBack(caseId){
  var stomp_args = {
    port: config.stomp.port,
    host: config.stomp.host,
    debug: true,
    login: config.stomp.user,
    passcode: config.stomp.password
  };

  var client = new stomp.Stomp(stomp_args);
  client.connect();

  client.on('connected', function() {

    var body = content.replace(/00000/g, caseId);

    client.send({
      'destination': config.stomp.isoRequestQueue,
      'body': JSON.stringify({
        "caseId": caseId,
        "content": body

      }),
      'persistent': 'true'
    });
  });
}

export function create(req, res) {
  console.log("Sent a response");
	res.status(200);
	res.header("Content-Type","application/json");
	res.send("OK");
	setTimeout(callBack,3000,req.body.case_id);
}
