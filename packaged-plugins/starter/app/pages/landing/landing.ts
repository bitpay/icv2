import {Page} from 'ionic-angular';
import { Icv2 } from 'icv2-plugin-client';

@Page({
  templateUrl: 'build/pages/landing/landing.html'
})
export class LandingPage {
  name: string;
  constructor(private icv2: Icv2) {
    switch (window.location.search.split('=')[1]) {
      case 'T2cbQLTFMXRnSzktFkuoG3eHoMeFtpTu3S:0':
        this.name = 'Company Funds';
        break;
      case 'TQ2TWHE3GMdB6BZKafqwxXtWAWgFt5Jvm3:0':
        this.name = 'Business Expenses';
        break;
      case 'TPSSGeFHDnKNxiEyFrD1wcEaHr9hrQDDWc:0':
        this.name = 'Colored Assets';
        break;
      default:
        this.name = 'Company Funds';
    }
  }
  closePlugin(){
    console.log('Trying to close plugin');
    this.icv2.close();
  }
}
