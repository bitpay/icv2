import { Page } from 'ionic-angular';
import { BuyPage } from './buy/buy';
import { SellPage } from './sell/sell';
import { hideTabs, TabsProvider } from '../../../providers/providers';

@hideTabs()
@Page({
  templateUrl: 'build/pages/wallets/buy-and-sell/buy-and-sell.html'
})
export class BuyAndSellPage {
  BuyPage = BuyPage;
  SellPage = SellPage;
  constructor(public tabsProvider: TabsProvider) {
  }
}
