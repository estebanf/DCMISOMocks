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

function callBack(caseId, fileType){
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

    if (fileType == "ISORequest") {
      client.send({
        'destination': config.stomp.isoRequestQueue,
        'body': JSON.stringify({
          "caseId": caseId,
          "content": body

        }),
        'persistent': 'true'
      });
    } else if(fileType == "IQLetter") {
      client.send({
        'destination': config.stomp.iqLetterQueue,
        'body': JSON.stringify({
          "BatchId": 1,
          "ClientId": 53,
          "CaseId": caseId,
          "FileId": "XWMRT2306493"
        }),
        'persistent': 'true'
      });
    }

  });
}

export function create(req, res) {
  console.log("Sent a response");
	res.status(200);
	res.header("Content-Type","application/json");
	res.send("OK");
	setTimeout(callBack,3000,req.body.CaseId, req.body.FileType);
}
