'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './log.events';

var LogSchema = new mongoose.Schema({
  process_instance_id: String,
  batch_id: String,
  case_id: String,
  step_id: String,
  log_type: String,
  description: String,
  created_at: Date,
  updated_at: Date
});
LogSchema.pre('save',function(next){
	var now = new Date();
	this.updated_at = now;
	if(!this.created_at){
		this.crated_at= now;
	}
	next();
});
registerEvents(LogSchema);
export default mongoose.model('Log', LogSchema);
