export class ResponseMessage {
  type = 'undefined';
  static isInstance(e: MessageEvent){
    var content = e.data;
    if(typeof content === 'string' && content === type){
      return true;
    }
    return false;
  }
}

export class ReadyResponseMessage extends ResponseMessage {
  type = 'ReadyResponseMessage';
}

export class ActivityResponseMessage extends ResponseMessage {
  type = 'ActivityResponseMessage';
}
