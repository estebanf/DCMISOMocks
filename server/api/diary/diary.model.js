'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './diary.events';

var DiarySchema = new mongoose.Schema({
  ClientId: String,
  CaseId: String,
  CreateDate: Date,
  CreatedBy: String,
  DiaryType: String,
  DiaryStatus: String,
  DiaryFrom: String,
  Description: String,
});

registerEvents(DiarySchema);
export default mongoose.model('Diary', DiarySchema);
