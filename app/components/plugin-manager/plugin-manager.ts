import { Component, ElementRef } from "angular2/core";
import { PluginInstanceHandler } from './plugin-instance-handler';
import { Activity, DateRange } from 'icv2-plugin-client/events';
export { PluginInstance } from './plugin-instance';
import { Events } from 'ionic-angular';

@Component({
  selector: 'plugin-manager',
  template: ''
})

export class PluginManager {

  events: Events;
  private _pluginManagerDomElement: ElementRef;
  private _PluginInstanceHandlers: {[s: string]: PluginInstanceHandler} = {};

  // for performance testing
  private _debug = true;
  private _initTime: number;
  private _pluginsToMock = 1;
  private _readyMessagesReceived = 0;
  private _pluginsReady = false;

  constructor(public elem: ElementRef, events: Events){
    console.log('PluginManager constructor called.');
    this._pluginManagerDomElement = elem;
    this.events = events;

    // mock some plugins
    for(var i = 1; i <= this._pluginsToMock; i++){
      this._PluginInstanceHandlers['id' + i] = new PluginInstanceHandler('Sample Plugin ' + i);
    }

    this._listenForActivityRequests();

    // for performance testing
    if(this._debug){
      this._initTime = new Date().getTime();
    }
    window.addEventListener('message', this.receiveData.bind(this));
    this.loadPlugins();
  }

  // We do this outside of Angular 2 (typically not recommended) because we
  // need access to the nativeElement for each iframe, and this API is simple
  // and should remain stable and reliable.
  loadPlugins(){
    for(var id in this._PluginInstanceHandlers){
      var newIframe = document.createElement('iframe');
      newIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
      this._pluginManagerDomElement.nativeElement.appendChild(newIframe);
      newIframe.setAttribute('src', 'http://localhost:13000/?id=' + id);
      this._PluginInstanceHandlers[id].iframe = newIframe;
    }
  }

  // this method passes unsanitized data to the proper PluginInstanceHandler
  receiveData(event: MessageEvent){
    var senderId: string;
    for(var instanceId in this._PluginInstanceHandlers){
      if(this._PluginInstanceHandlers[instanceId].iframe.contentWindow === event.source){
        senderId = instanceId;
        break;
      }
    }
    if(senderId) {
      this._PluginInstanceHandlers[senderId].handleMessageFromPlugin(event);
    } else {
      console.error('Security Alert: A Plugin API message was received from an unknown source.');
    }

    // for performance testing
    if(this._debug){
      if(!this._pluginsReady){
        var ready = true;
        for(var pluginId in this._PluginInstanceHandlers){
          if(!this._PluginInstanceHandlers[pluginId].ready){
            ready = false;
            break;
          }
        }
        if(ready){
          var finishTime = new Date().getTime();
          var milliseconds = finishTime - this._initTime;
          var report = this._pluginsToMock + ' plugins loaded, Angular2+Ionic platform ready, in: ' + milliseconds + 'ms (' + milliseconds / 1000 + 's)';
          console.log(report);
          // window.alert(report);
          this._pluginsReady = true;
        }
      }
    }
  }

  private _listenForActivityRequests(){
    this.events.subscribe('activity:requests', (args: DateRange[]) => {
      var dateRange = args[0];
      for(var pluginId in this._PluginInstanceHandlers){
        this._PluginInstanceHandlers[pluginId].getActivity(dateRange, (response: Activity[]) => {
          this.events.publish('activity:responses', ...response);
        });
      }
    });
  }

}
