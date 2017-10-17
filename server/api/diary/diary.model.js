'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './diary.events';

var DiarySchema = new mongoose.Schema({
  client_id: String,
  case_id: String,
  created_by: String,
  diary_type: String,
  diary_status: String,
  due_date: Date,
  diary_from: String,
  diary_to: String,
  description: String,
  created_at: Date
});

registerEvents(DiarySchema);
export default mongoose.model('Diary', DiarySchema);
