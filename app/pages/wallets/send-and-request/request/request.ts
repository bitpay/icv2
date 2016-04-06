import {Page} from 'ionic-angular';
import { TabsProvider } from '../../../../providers/providers';

@Page({
  templateUrl: 'build/pages/wallets/send-and-request/request/request.html'
})
export class RequestPage {
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
