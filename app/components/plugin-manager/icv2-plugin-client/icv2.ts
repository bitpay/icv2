// todo: provide instance of icv2 for injection in Angular apps
// import {provide, Provider} from 'angular2/core';

import { Activity } from './events';
import { PluginApiMessage, ReadyMessage, ActivityMessage } from './plugin-api-messages';
// TODO: can we export Activity from this file to simplify usage?

export class Icv2 {
  private _host = window.parent;

  // activity responder
  private _activityResponder: (begin: Date, end: Date) => Activity[];
  private _asyncActivityResponder: (begin: Date, end: Date, callback: (activity: Activity[]) => void) => void;
  private _useAsyncActivityResponder: boolean;

  constructor() {
    console.log('icv2 constructed.');
    window.addEventListener('message', this._receiveData.bind(this));
  }

  private _receiveData(event: MessageEvent) {
    console.log('plugin recieved data:');
    console.log(event.data);
    var request: PluginApiMessage;
    try{
      console.log(event);
      request = PluginApiMessage.deserialize(event);
    } catch(error){
      console.error(error);
    }

    // route to proper responder
    if(request instanceof ActivityMessage){
      this._runActivityResponder(request);
    }

  }

  private _sendData(message: PluginApiMessage) {
    this._host.postMessage(message.serialize(), '*');
  }

  ready() {
    this._sendData(new ReadyMessage());
  }

  setActivityResponder(func: (begin: Date, end: Date) => Activity[]){
    this._activityResponder = func;
    this._useAsyncActivityResponder = false;
  }

  setAsyncActivityResponder(func: (begin: Date, end: Date, callback: (activity: Activity[]) => void) => void){
    this._asyncActivityResponder = func;
    this._useAsyncActivityResponder = true;
  }

  private _runActivityResponder(request: ActivityMessage){
    console.log('running activity responder');
    var activity: Activity[];
    if(this._useAsyncActivityResponder){
      this._asyncActivityResponder(request.begin, request.end, (activity: Activity[]) => {
        this._respondWithActivity(request, activity);
      });
    } else {
      activity = this._activityResponder(request.begin, request.end);
      this._respondWithActivity(request, activity);
    }
  }
  private _respondWithActivity(request: ActivityMessage, activity: Activity[]){
    request.setActivity(activity);
    this._sendData(request);
  }

}
