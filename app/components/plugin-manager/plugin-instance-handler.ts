// TODO: use ExceptionHandler
import { Activity, DateRange } from 'icv2-plugin-client/events';
import { PluginApiMessage, ReadyMessage, ActivityMessage } from 'icv2-plugin-client/plugin-api-messages';

// This class is responsible for communicating with plugins, enforcing
// permissions, and sanatizing all plugin communications.

export class PluginInstanceHandler {
  name: string;
  iframe: HTMLIFrameElement;
  ready: boolean;
  private _outgoingRequestStack: PendingRequest[] = [];
  constructor(name: string){
    this.name = name;
  }
  private _sendRequest(requestContents: PluginApiMessage, callback: (response: PluginApiMessage) => any){
    var request = new PendingRequest(requestContents, this._outgoingRequestStack, callback);
    this._outgoingRequestStack.push(request);
    if(this.ready){
      request.send(this.iframe);
    }
  }

  getActivity(dateRange: DateRange, callback: (response: Activity[]) => any){
    var activityRequest = new ActivityMessage({
      begin: dateRange.begin,
      end: dateRange.end
    });
    this._sendRequest(activityRequest, (response: PluginApiMessage) => {
      if(response instanceof ActivityMessage){
        callback(response.activity);
      } else {
        throw TypeError('getActivity received non-ActivityMessage response.')
      }
    });
  }

  handleMessageFromPlugin(event: MessageEvent){
    var message: PluginApiMessage;
    try{
      // validate and sanatize message
      message = PluginApiMessage.deserialize(event);
    } catch(error){
      console.error(error);
    }

    if(!this.ready){
      if(message instanceof ReadyMessage){
        this.ready = true;
        this._flushOutgoingRequestStack();
      }
    }

    // first check if this is a response
    var request: PendingRequest;
    for(var i = 0; i < this._outgoingRequestStack.length; i++){
      if(this._outgoingRequestStack[i].requestId === message.requestId){
        request = this._outgoingRequestStack.splice(i, 1)[0];
        this._handleResponse(request, message);
        break;
      }
    }

    // TODO:
    // request originated from plugin
    // check permissions, provide data / execute action if ok
  }

  private _handleResponse(request: PendingRequest, response: PluginApiMessage){
    // check if response matches request type
    if(Object.getPrototypeOf(request.message) !== Object.getPrototypeOf(response)){
      throw new TypeError('The plugin returned a message of the wrong type for request: ' + request.requestId);
    }
    // pass response to callback
    request.callback(response);
  }

  // fire all pending reqests when plugin is ready
  private _flushOutgoingRequestStack(){
    this._outgoingRequestStack.forEach((req: PendingRequest) => {
      req.send(this.iframe);
    });
  }
}

class PendingRequest {
  requestId: string;
  message: PluginApiMessage;
  private _sent: boolean;
  callback: (response: Object) => any;
  constructor(message: PluginApiMessage, stack: PendingRequest[], callback: (response: Object) => any){
    this._sent = false;
    this.message = message;
    this.callback = callback;
    var timePart = Date.now().toString() + '_';
    var reqNum = 0;
    var conflict = false;
    do {
      var nextId = timePart + reqNum;
      for(var i = 0; i < stack.length; i++){
        if(stack[i].requestId === nextId){
          conflict = true;
          break;
        }
      }
    } while(conflict)
    this.requestId = nextId;
    message.requestId = nextId;
  }
  send(iframe: HTMLIFrameElement){
    if(!this._sent){
      iframe.contentWindow.postMessage(this.message.serialize(), '*');
      this._sent = true;
    }
  }
}
