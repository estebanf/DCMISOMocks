
'use strict';

import jsonpatch from 'fast-json-patch';


// Creates a new Isoscore in the DB
export function create(req, res) {
  console.log("The req was " + JSON.stringify(req.body));
  console.log("Posted to server/isoscore " + req.rawBody);
}
