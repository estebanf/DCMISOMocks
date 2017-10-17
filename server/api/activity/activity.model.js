'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './activity.events';

var ActivitySchema = new mongoose.Schema({
  client_id: String,
  case_id: String,
  created_by: String,
  activity_type: String,
  description: String,
  created_at: Date
});

registerEvents(ActivitySchema);
export default mongoose.model('Activity', ActivitySchema);
