import {Page} from 'ionic-angular';
import { } from '../../../components';
import { TabsProvider } from '../../../providers';

@Page({
  templateUrl: 'build/pages/wallets/send-and-request/send-and-request.html'
})
export class SendAndRequestPage {
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
