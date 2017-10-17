'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './Activity.events';

var ActivitySchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(ActivitySchema);
export default mongoose.model('Activity', ActivitySchema);
