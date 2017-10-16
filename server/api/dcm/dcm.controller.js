'use strict';

import jsonpatch from 'fast-json-patch';


export function create(req, res) {
	res.status(200);
	res.header("Content-Type","application/xml");
	res.send("<root/>");
}