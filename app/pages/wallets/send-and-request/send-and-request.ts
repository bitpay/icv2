import { Page } from 'ionic-angular';
import { SendPage } from './send/send';
import { RequestPage } from './request/request';
import { RootNavigationProvider } from '../../../providers/providers';

@Page({
  templateUrl: 'build/pages/wallets/send-and-request/send-and-request.html'
})
export class SendAndRequestPage {
  constructor(public rootNav: RootNavigationProvider) {}
  send(){
    this.rootNav.getRootNav().push(SendPage);
  }
  request(){
    this.rootNav.getRootNav().push(RequestPage);
  }
}
