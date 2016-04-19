import 'es6-shim';
import { App, Platform, IonicApp, Events } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';
import { RootNavigationProvider, ProfileProvider, ActivityProvider, PersistentStorageProvider } from './providers/providers';

@App({
  providers: [PersistentStorageProvider, ProfileProvider, RootNavigationProvider, ActivityProvider],
  template:
  `
  <ion-nav id="rootNav" [root]="rootPage"></ion-nav>
  `,
  config: {
    tabbarPlacement: 'bottom'
  }
})
export class MyApp {
  rootPage: any;

  constructor(public app: IonicApp, platform: Platform, public rootNav: RootNavigationProvider) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      StatusBar.show();
      StatusBar.styleDefault();
    });
  }

 ngAfterViewInit() {
   this.rootNav.setRootNav(this.app.getComponent('rootNav'));
 }
}
