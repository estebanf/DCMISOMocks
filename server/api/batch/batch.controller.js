'use strict';

import jsonpatch from 'fast-json-patch';
import config from '../../config/environment';
var mqClient = null;

export function registerStompClient(stomp){
  mqClient = stomp; 
}

export function create(req, res) {
	mqClient.send({
		'destination': config.stomp.batchCaseQueue,
		'body': JSON.stringify(req.body),
		'persistent':'true'
	})

	res.status(200);
	res.header("Content-Type","application/json");
	res.send({result:"ok"});
}