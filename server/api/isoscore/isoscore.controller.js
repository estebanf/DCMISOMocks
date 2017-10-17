
'use strict';

import request from 'request';
import config from '../../config/environment';


// Creates a new Isoscore in the DB
export function create(req, res) {

  var scoreResponse = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:iso="http://bpms.everteam.com/Processes/Core/ProcessISOResponse/ISO_Response_Manager" xmlns:laun="http://www.example.org/Launchpoint">\n' +
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
  });
}
