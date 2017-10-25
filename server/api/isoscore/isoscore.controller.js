
'use strict';

import request from 'request';
import config from '../../config/environment';
import stomp from 'stomp';


// Creates a new Isoscore in the DB
export function create(req, res) {
  // ToDo: Need to POST the JSON to the queue, instead of the XML to the process

  var stomp_args = {
    port: 61613,
    host: 'localhost',
    debug: true,
    login: 'guest',
    passcode: 'guest',
  }

  var client = new stomp.Stomp(stomp_args);

  var queue = '/queue/iso_score';

  client.connect();

  client.on('connected', function() {

    client.send({
      'destination': queue,
      'body': JSON.stringify({
        "batchId": "?",
        "environmentId" : "?",
        "caseId": req.body.caseId,
        "score": req.body.score,
        "status": req.body.status
      }),
      'persistent': 'true'
    });

/*
    client.send({
      'destination': queue,
      'body': JSON.stringify({
        "BatchId": 1,
        "ClientId": 53,
        "CaseId": req.body.caseId,
        "ISOScore": req.body.score,
        "Status": req.body.status
      }),
      'persistent': 'true'
    });
*/


    client.disconnect();
  });



/*  var scoreResponse = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:iso="http://bpms.everteam.com/Processes/Core/ProcessISOResponse/ISO_Response_Manager" xmlns:laun="http://www.example.org/Launchpoint">\n' +
    '   <soapenv:Header/>\n' +
    '   <soapenv:Body>\n' +
    '      <iso:Receive_ScoringRequest>\n' +
    '         <laun:batchId>?</laun:batchId>\n' +
    '         <laun:caseId>' + req.body.caseId + '</laun:caseId>\n' +
    '         <laun:environmentId>?</laun:environmentId>\n' +
    '         <laun:status>' + req.body.status + '</laun:status>\n' +
    '         <laun:score>' + req.body.score + '</laun:score>\n' +
    '      </iso:Receive_ScoringRequest>\n' +
    '   </soapenv:Body>\n' +
    '</soapenv:Envelope>'

  request({
    url: config.bpm.uri + 'ode/processes/LaunchPointProcess_Processes_Core_ProcessISOResponse_ISO_Response_Manager_DCM',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8'
    },
    method: 'POST',
    body: scoreResponse
  }, function(err, resp, data){
    if(err) {
    } else {
      res.status(200);
      res.send({});
    }
  });*/
}
