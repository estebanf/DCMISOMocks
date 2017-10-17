'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './diary.events';

var DiarySchema = new mongoose.Schema({
  process_instance_id: String,
  batch_id: String,
  case_id: String,
  request_id: String,
  activity_type: String,
  description: String,
  created_at: Date,
  updated_at: Date
});

registerEvents(DiarySchema);
export default mongoose.model('Diary', DiarySchema);
