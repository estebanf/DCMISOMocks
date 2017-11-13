'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './activity.events';

var ActivitySchema = new mongoose.Schema({
  ClientId: String,
  CaseId: String,
  CreatedBy: String,
  ActivityType: String,
  ActivityCode: String,
  Description: String
});

registerEvents(ActivitySchema);
export default mongoose.model('Activity', ActivitySchema);
