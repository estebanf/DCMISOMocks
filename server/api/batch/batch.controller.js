'use strict';

import jsonpatch from 'fast-json-patch';
var mqClient = null;

export function registerStompClient(stomp){
  mqClient = stomp; 
}

export function create(req, res) {
	console.log("here");
	console.log(req.body);
	console.log(mqClient);
	mqClient.send({
		'destination': '/queue/test',
		'body': JSON.stringify(req.body),
		'persistent':'true'
	})

	res.status(200);
	res.header("Content-Type","application/json");
	res.send({result:"ok"});
}