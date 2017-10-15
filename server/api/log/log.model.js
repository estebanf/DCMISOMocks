'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './log.events';

var LogSchema = new mongoose.Schema({
  process_instance_id: String,
  batch_id: String,
  case_id: String,
  step_id: String,
  log_type: String,
  description: String
});

registerEvents(LogSchema);
export default mongoose.model('Log', LogSchema);
