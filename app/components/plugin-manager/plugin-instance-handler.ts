// TODO: use ExceptionHandler
import { Activity, PluginApiMessage, ReadyMessage, CloseMessage, ActivityMessage } from 'icv2-plugin-client';
import { PluginInstance } from './plugin-instance';
import { ActivityProvider, RootNavigationProvider } from '../../providers/providers';

// This class is responsible for communicating with plugins, enforcing
// permissions, and sanatizing all plugin communications.

export class PluginInstanceHandler {
  name: string;
  iframe: HTMLIFrameElement;
  ready: boolean;
  constructor(private instance: PluginInstance, private activityProvider: ActivityProvider, private rootNav: RootNavigationProvider){
    this.name = instance.name;
  }
  destroy(){
    console.log('destroying plugin instance handler: ' + this.name);
    console.error('Not yet implemented.');
    // TODO
  }

  handleMessageFromPlugin(event: MessageEvent){
    var message: PluginApiMessage;
    try{
      // validate and sanatize message
      message = PluginApiMessage.deserialize(event);
    } catch(error){
      console.error(error);
    }

    // TODO:
    // check permissions, provide data / execute action if ok
    console.log('handling message from plugin:');
    console.log(message);

    if(message instanceof ReadyMessage){
      this.ready = true;
    }

    if(message instanceof CloseMessage){
      console.log('TODO: should verify which plugin sent close message.');
      this.rootNav.reselectTab();
      this.rootNav.closePlugin();
    }

    if(message instanceof ActivityMessage){
      message.activity.forEach((item)=>{
        item.id = `${this.instance.derivationPath}:${item.id}`;
      })
      this.activityProvider.saveActivity(message.activity);
    }


  }
}
