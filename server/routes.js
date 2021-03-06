/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/generateIQBatch', require('./api/generateIQBatch'));
  app.use('/api/iqtracking', require('./api/IQTracking'));
  app.use('/api/isoscore', require('./api/isoscore'));
  app.use('/api/diaries', require('./api/diary'));
  app.use('/api/activities', require('./api/activity'));
  app.use('/api/logs', require('./api/log'));
  app.use('/api/batchtracking',require('./api/batchtracking'))
  app.use('/api/iso',require('./api/iso'))
  app.use('/api/generateFile',require('./api/generateFile'))
  app.use('/api/batch',require('./api/batch'))
  app.use('/api/isotracking',require('./api/isotracking'))
  app.use('/api/dcm',require('./api/dcm'))
  app.use('/api/isoresponsetracking',require('./api/isoresponsetracking'))
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
