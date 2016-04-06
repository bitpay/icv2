import {Page} from 'ionic-angular';
import { TabsProvider } from '../../../../providers/providers';

@Page({
  templateUrl: 'build/pages/wallets/buy-and-sell/buy/buy.html'
})
export class BuyPage {
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
