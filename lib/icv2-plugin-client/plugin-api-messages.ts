import { Activity } from './';

export class PluginApiMessage {
  static type = 'empty';
  requestId: string;
  constructor(data: any){
    if(data){
      this.requestId = data.requestId;
    }
  }
  serialize(){
    return {
      type: PluginApiMessage.type,
      requestId: this.requestId
    };
  }
  
  // TODO: how will icv2 handle cases where a plugin accidentally or maliciously
  // passes an invalid parameter?
  // deserialize()/constructors should validate/sanitize data
  static deserialize(event: MessageEvent){
    var data = event.data;
    if(typeof data !== 'undefined' && typeof data.type === 'string'){
      switch(data.type){
        case ReadyMessage.type:
          return new ReadyMessage();
        case ActivityMessage.type:
          return new ActivityMessage(data);
        default:
          throw new TypeError('Unrecognized message type sent by plugin.');
      }
    }
  }
}

export class ReadyMessage extends PluginApiMessage {
  static type = 'ready';
  constructor(){
    super(null);
  }
  serialize(){
    return {
      type: ReadyMessage.type,
      requestId: this.requestId
    };
  }
}

export class ActivityMessage extends PluginApiMessage {
  static type = 'activity';
  activity: Activity[];
  constructor(data: any){
    super(data);
    this.activity = data.activity;
  }
  serialize(){
    return {
      type: ActivityMessage.type,
      activity: this.activity,
      requestId: this.requestId
    };
  }
  setActivity(activity: Activity[]){
    this.activity = activity;
  }
}
