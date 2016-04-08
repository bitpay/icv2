import 'es6-shim';
import { App, Platform, IonicApp } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';
import { PluginManager } from './components/components';
import { RootNavigationProvider, ProfileProvider } from './providers/providers';

@App({
  directives: [PluginManager],
  providers: [ProfileProvider, RootNavigationProvider],
  template:
  `
  <ion-nav id="rootNav" [root]="rootPage"></ion-nav>
  <plugin-manager></plugin-manager>
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
