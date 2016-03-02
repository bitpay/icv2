import {App, Platform} from 'ionic-framework/ionic';
import {LandingPage} from './pages/landing/landing';
import { Icv2 } from './icv2-plugin-client/icv2';
import { Activity } from './icv2-plugin-client/events';

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
      var id = window.location.search.split('=')[1];

      icv2.ready();

      function sampleResponder(begin: Date, end: Date){
        console.log('fetching activity between ' + begin + 'and' + end);
        var activity: Activity[];
        switch(id){
          case 'id1':
            return companyFunds();
          case 'id2':
            return businessExpenses();
          case 'id3':
            return coloredCoins();
          default:
            return companyFunds();
        }
      }
      icv2.setActivityResponder(sampleResponder);
    });
  }
}


function companyFunds(){
  var activity: Activity[] = [
    new Activity({
      heading: 'Payment Proposal',
      content: 'Company Funds',
      data: '-1,423,000 bits',
      date: new Date(Date.now() - 1000*60*60*2),
      deeplink: null,
      notification: true
    }),
    new Activity({
      heading: 'Payment Received',
      content: 'Company Funds',
      data: '-1,423,000 bits',
      date: new Date(Date.now() - 1000*60*60*24*0.8),
      deeplink: null
    }),
    new Activity({
      heading: '2 of 3 Wallet Created',
      content: 'Company Funds',
      data: null,
      date: new Date(Date.now() - 1000*60*60*24*1.5),
      deeplink: null
    })
  ];
  return activity;
}

function businessExpenses(){
  var activity: Activity[] = [
    new Activity({
      heading: 'Payment Received',
      content: 'Business Expenses',
      data: '163,500 bits',
      date: new Date(Date.now() - 1000*60*60*5),
      deeplink: null
    }),
    new Activity({
      heading: 'Payment Sent',
      content: 'Business Expenses',
      data: '43,000 bits',
      date: new Date(Date.now() - 1000*60*60*24*0.8),
      deeplink: null
    })
  ];
  return activity;
}

function coloredCoins(){
  var activity: Activity[] = [
    new Activity({
      heading: 'Issued BPAY Stock',
      content: 'Business Assets (2 of 3)',
      data: '13,000 shares',
      date: new Date(Date.now() - 1000*60*60*7),
      deeplink: null
    }),
    new Activity({
      heading: 'Received USD Payment',
      content: 'Business Assets (2 of 3)',
      data: '$12,854.45 USD',
      date: new Date(Date.now() - 1000*60*60*24*0.8),
      deeplink: null
    }),
    new Activity({
      heading: 'Received EUR Payment',
      content: 'Business Assets (2 of 3)',
      data: '$43,691.70 EUR',
      date: new Date(Date.now() - 1000*60*60*24*0.9),
      deeplink: null
    })
  ];
  return activity;
}
