import {Page} from 'ionic-angular';
import { TabsProvider } from '../../../providers/providers';
import { BuyPage } from './buy/buy';
import { SellPage } from './sell/sell';

@Page({
  templateUrl: 'build/pages/wallets/buy-and-sell/buy-and-sell.html'
})
export class BuyAndSellPage {
  BuyPage = BuyPage;
  SellPage = SellPage;
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
