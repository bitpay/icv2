import {Page} from 'ionic-angular';
import { TabsProvider } from '../../../../providers/providers';

@Page({
  templateUrl: 'build/pages/wallets/send-and-request/send/send.html'
})
export class SendPage {
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
