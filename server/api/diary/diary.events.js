/**
 * Diary model events
 */

'use strict';

import {EventEmitter} from 'events';
var DiaryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DiaryEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Diary) {
  for(var e in events) {
    let event = events[e];
    Diary.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    DiaryEvents.emit(event + ':' + doc._id, doc);
    DiaryEvents.emit(event, doc);
  };
}

export {registerEvents};
export default DiaryEvents;
