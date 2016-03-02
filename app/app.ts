import {App, Platform, Events} from 'ionic-framework/ionic';
import {TabsPage} from './pages/tabs/tabs';
import {PluginManager} from './components/plugin-manager/plugin-manager';

@App({
  directives: [PluginManager],
  template:
  `
  <ion-nav [root]="rootPage"></ion-nav>
  <plugin-manager></plugin-manager>
  `,
  config: {
    tabbarPlacement: 'bottom'
  }
})
export class MyApp {

  events: Events;
  rootPage: any = TabsPage;

  constructor(platform: Platform, events: Events) {
    this.events = events;

    platform.ready().then(() => {

      console.log('MyApp constructed.');
      // Do any necessary cordova or native calls here now that the platform is ready
      if (window.StatusBar) {
        window.StatusBar.show();
        window.StatusBar.styleDefault();
      }
    });
  }
}
