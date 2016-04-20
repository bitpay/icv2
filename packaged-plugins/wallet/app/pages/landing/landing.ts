import {Page} from 'ionic-angular';
import { Icv2 } from 'icv2-plugin-client';

@Page({
  templateUrl: 'build/pages/landing/landing.html'
})
export class LandingPage {
  name: string;
  constructor(private icv2: Icv2) {
    this.name = 'Wallet';
  }
  closePlugin(){
    this.icv2.close();
  }
}
