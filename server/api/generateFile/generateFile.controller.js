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

function callBack(environmentId, reqBody){
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

    var body = content.replace(/00000/g, reqBody.CaseId);

    if (reqBody.FileType == "ISORequest") {
      client.send({
        'destination': config.stomp.isoRequestQueue,
        'body': JSON.stringify({
          "ClientId": reqBody.ClientId,
          "CaseId": reqBody.CaseId,
          "BatchId":reqBody.BatchId,
          "EnvironmentId": environmentId,
          "Content": body

        }),
        'persistent': 'true'
      });
    } else if(reqBody.FileType == "IQLetter") {
      client.send({
        'destination': config.stomp.iqLetterQueue,
        'body': JSON.stringify({
          "BatchId": reqBody.BatchId,
          "ClientId": reqBody.ClientId,
          "CaseId": reqBody.CaseId,
          "EnvironmentId": environmentId,
          "FileId": "XWMRT2306493"
        }),
        'persistent': 'true'
      });
    } else if(reqBody.FileType == "ISOResponse") {
      client.send({
        'destination': config.stomp.isoScoreQueue,
        'body': JSON.stringify({
          "BatchId": reqBody.BatchId,
          "ClientId": reqBody.ClientId,
          "CaseId": reqBody.CaseId,
          "EnvironmentId": environmentId,
          "ISOScore": "HIT"
        }),
        'persistent': 'true'
      });
    }

  });
}

export function create(req, res) {
  console.log("Sent a response " + JSON.stringify(req.params));
	res.status(200);
	res.header("Content-Type","application/json");
  res.send({result:"ok"});
	setTimeout(callBack,3000,req.params["EnvironmentId"],req.body);
}
