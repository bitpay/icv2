import {Page} from 'ionic-angular';
import { TabsProvider } from '../../../providers/providers';
import { SendPage } from './send/send';
import { RequestPage } from './request/request';

@Page({
  templateUrl: 'build/pages/wallets/send-and-request/send-and-request.html'
})
export class SendAndRequestPage {
  SendPage = SendPage;
  RequestPage = RequestPage;
  TabsProvider: TabsProvider;

  constructor(TabsProvider: TabsProvider) {
    this.TabsProvider = TabsProvider;
  }

  onPageWillEnter(){
    this.TabsProvider.hideTabs();
  }

  onPageWillLeave(){
    this.TabsProvider.showTabs();
  }
}
