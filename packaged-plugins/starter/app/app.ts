import {App, Platform} from 'ionic-angular';
import {LandingPage} from './pages/landing/landing';
import { Icv2, Activity } from 'icv2-plugin-client';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {}
})
export class MyApp {
  rootPage: any = LandingPage;
  icv2: Icv2 = new Icv2();

  constructor(platform: Platform) {
  // TODO: provide icv2 for angular apps
  // constructor(platform: Platform, icv2: Icv2) {
  var icv2 = this.icv2; // TEMP

    platform.ready().then(() => {
      var path = window.location.search.split('=')[1];

      function getSampleActivity(path){
        switch(path){
          case 'T2cbQLTFMXRnSzktFkuoG3eHoMeFtpTu3S/0':
            return companyFunds();
          case 'TQ2TWHE3GMdB6BZKafqwxXtWAWgFt5Jvm3/0':
            return businessExpenses();
          case 'TPSSGeFHDnKNxiEyFrD1wcEaHr9hrQDDWc/0':
            return coloredCoins();
          default:
            return companyFunds();
        }
      }

      icv2.saveActivity(getSampleActivity(path));

      console.log('Ionic platform.ready() called for plugin: ' + path);
    });
  }
}


function companyFunds(){
  var activity: Activity[] = [
    new Activity({
      description: 'Payment Proposal',
      data: '-1,423,000 bits',
      timestamp: new Date(Date.now() - 1000*60*60*2),
      id: '1',
      deeplink: false,
      notification: true
    }),
    new Activity({
      description: 'Payment Received',
      data: '-1,423,000 bits',
      timestamp: new Date(Date.now() - 1000*60*60*24*0.8),
      id: '2',
      deeplink: false
    }),
    new Activity({
      description: '2 of 3 Wallet Created',
      data: null,
      timestamp: new Date(Date.now() - 1000*60*60*24*1.5),
      id: '3',
      deeplink: false
    })
  ];
  return activity;
}

function businessExpenses(){
  var activity: Activity[] = [
    new Activity({
      description: 'Payment Received',
      data: '163,500 bits',
      timestamp: new Date(Date.now() - 1000*60*60*5),
      id: '1',
      deeplink: false
    }),
    new Activity({
      description: 'Payment Sent',
      data: '43,000 bits',
      timestamp: new Date(Date.now() - 1000*60*60*24*0.8),
      id: '2',
      deeplink: false
    })
  ];
  return activity;
}

function coloredCoins(){
  var activity: Activity[] = [
    new Activity({
      description: 'Issued BPAY Stock',
      data: '13,000 shares',
      timestamp: new Date(Date.now() - 1000*60*60*7),
      id: '1',
      deeplink: false
    }),
    new Activity({
      description: 'Received USD Payment',
      data: '$12,854.45 USD',
      timestamp: new Date(Date.now() - 1000*60*60*24*0.8),
      id: '2',
      deeplink: false
    }),
    new Activity({
      description: 'Received EUR Payment',
      data: '$43,691.70 EUR',
      timestamp: new Date(Date.now() - 1000*60*60*24*0.9),
      id: '3',
      deeplink: false
    })
  ];
  return activity;
}
