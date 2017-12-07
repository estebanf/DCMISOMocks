/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/generateIQBatch              ->  index
 * POST    /api/generateIQBatch              ->  create
 * GET     /api/generateIQBatch/:id          ->  show
 * PUT     /api/generateIQBatch/:id          ->  upsert
 * PATCH   /api/generateIQBatch/:id          ->  patch
 * DELETE  /api/generateIQBatch/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import fs from 'fs';
import request from 'request';
import config from '../../config/environment';
import stomp from 'stomp';

function callBack(requestBody) {
  var stomp_args = {
    port: config.stomp.port,
    host: config.stomp.host,
    debug: true,
    login: config.stomp.user,
    passcode: config.stomp.password
  };

  var client = new stomp.Stomp(stomp_args);
  client.connect();

  client.on('connected', function () {

    var modifiedCases = [];

    for (var i = 0; i < requestBody.Cases.length; i++) {
      var batchCase = requestBody.Cases[i];
        modifiedCases.push({
          CaseId : batchCase.CaseId,
          success : true
        });
    }

    requestBody.Cases = modifiedCases;

    client.send({
      'destination': config.stomp.iqBatchQueue,
      'body': JSON.stringify(requestBody),
      'persistent': 'true'
    });
  });
};

// Creates a new GenerateIQBatch in the DB
export function create(req, res) {
  console.log("Sent a response");
  res.status(200);
  res.header("Content-Type", "application/json");
  res.send("OK");
  setTimeout(callBack, 3000, req.body);
}
