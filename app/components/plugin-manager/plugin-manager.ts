import { Component, ElementRef } from "angular2/core";
import { PluginInstanceHandler } from './plugin-instance-handler';
export { PluginInstance, Plugin, DerivationPath } from './plugin-instance';
import { Activity } from 'icv2-plugin-client';
import { ProfileProvider, Profile, ActivityProvider, RootNavigationProvider } from '../../providers/providers';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'plugin-manager',
  template: ''
})

export class PluginManager {

  private _PluginInstanceHandlers: PluginInstanceHandler[] = [];

  // for performance testing
  private _debug = true;
  private _initTime: number;
  private _readyMessagesReceived = 0;
  private _pluginsReady = false;

  constructor(
    private _elem: ElementRef,
    private profileProvider: ProfileProvider,
    private activityProvider: ActivityProvider,
    private rootNav: RootNavigationProvider
  ){
    this.profileProvider.currentProfile.subscribe((currentProfile: Profile) => {
      console.log('plugin manager received profile: ', currentProfile);
      // for performance testing
      if(this._debug){
        this._initTime = new Date().getTime();
      }
      if(this._PluginInstanceHandlers.length > 0){
        // spin down current handlers
        this._PluginInstanceHandlers.forEach((instance)=>{
          instance.destroy();
        });
      }
      currentProfile.pluginInstances.forEach((instance)=>{
        // spin up new handlers
        var handler = new PluginInstanceHandler(instance, activityProvider, rootNav);
        var newIframe = document.createElement('iframe');
        newIframe.setAttribute('id', instance.derivationPath.toString());
        newIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
        // We do this outside of Angular 2 (typically not recommended) because we
        // need access to the nativeElement for each iframe, and this API is simple
        // and should remain stable and reliable.
        this._elem.nativeElement.appendChild(newIframe);
        // passing in `path` param while testing – ultimately this should
        // initialize a unique plugin server host or url path for the plugin instance
        newIframe.setAttribute('src', 'http://localhost:13000/?path=' + instance.derivationPath);
        handler.iframe = newIframe;
        this._PluginInstanceHandlers.push(handler);
      });
    });

    window.addEventListener('message', this.receiveData.bind(this));
  }

  // this method passes unsanitized data to the proper PluginInstanceHandler
  receiveData(event: MessageEvent){
    var sender: PluginInstanceHandler;
    for(var i = 0; i < this._PluginInstanceHandlers.length; i++){
      if(this._PluginInstanceHandlers[i].iframe.contentWindow === event.source){
        sender = this._PluginInstanceHandlers[i];
        break;
      }
    }
    if(sender) {
      sender.handleMessageFromPlugin(event);
    } else {
      console.error('Security Alert: A Plugin API message was received from an unknown source. Contents: ');
      console.log(event);
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
          var report = this._PluginInstanceHandlers.length + ' plugins loaded, ready, in: ' + milliseconds + 'ms (' + milliseconds / 1000 + 's)';
          console.log(report);
          // window.alert(report);
          this._pluginsReady = true;
        }
      }
    }
  }

}
