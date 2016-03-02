import { Activity } from './events';

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
  // passes an invalide parameter (invalid Date, Activity, requestId, etc)?
  // deserialize()/constructors should validate/sanitize data
  static deserialize(event: MessageEvent){
    var data = event.data;
    console.log(data);
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
  begin: Date;
  end: Date;
  activity: Activity[];
  constructor(data: any){
    super(data);
    this.begin = new Date(data.begin);
    this.end = new Date(data.end);
    this.activity = data.activity;
  }
  serialize(){
    return {
      type: ActivityMessage.type,
      begin: this.begin,
      end: this.end,
      activity: this.activity,
      requestId: this.requestId
    };
  }
  setActivity(activity: Activity[]){
    this.activity = activity;
  }
}
