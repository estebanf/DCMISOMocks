'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './diary.events';

var DiarySchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(DiarySchema);
export default mongoose.model('Diary', DiarySchema);
