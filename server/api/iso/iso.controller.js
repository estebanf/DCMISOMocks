'use strict';

import jsonpatch from 'fast-json-patch';

export function create(req, res) {
	console.log(req.body)
	res.status(200);
	res.header("Content-Type","application/json");
	res.send("");
}