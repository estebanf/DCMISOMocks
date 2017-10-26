
'use strict';

import request from 'request';
import config from '../../config/environment';
import stomp from 'stomp';


// Creates a new Isoscore in the DB
export function create(req, res) {

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

    client.send({
      'destination': config.stomp.isoScoreQueue,
      'body': JSON.stringify({
        "batchId": "?",
        "environmentId" : "?",
        "caseId": req.body.caseId,
        "score": req.body.score,
        "status": req.body.status
      }),
      'persistent': 'true'
    });

    client.disconnect();
  });
}
