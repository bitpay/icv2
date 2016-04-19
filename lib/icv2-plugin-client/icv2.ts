import { Injectable } from 'angular2/core';
import { Activity } from './';
import { PluginApiMessage, ReadyMessage, CloseMessage, ActivityMessage } from './plugin-api-messages';

@Injectable()
export class Icv2 {
  private _host = window.parent;

  constructor() {
    window.addEventListener('message', this._receiveData.bind(this));
    this._ready();
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

    // route to proper handler
    // if(request instanceof DeeplinkHandler){
    //   this._runActivityResponder(request);
    // }

  }

  private _sendData(message: PluginApiMessage) {
    this._host.postMessage(message.serialize(), '*');
  }

  private _ready() {
    this._sendData(new ReadyMessage());
  }

  public saveActivity(activity: Activity[]){
    this._sendData(new ActivityMessage({activity: activity}));
  }

  public close(){
    this._sendData(new CloseMessage());
  }

}
