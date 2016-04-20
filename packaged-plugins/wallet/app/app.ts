import { App, Platform } from 'ionic-angular';
import { LandingPage } from './pages/landing/landing';
import { Icv2, Activity } from 'icv2-plugin-client';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [Icv2],
  config: {}
})
export class MyApp {
  rootPage: any = LandingPage;

  constructor(platform: Platform, private icv2: Icv2) {
    platform.ready().then(() => {
      console.log('Wallet ready.');
    });
  }
}
