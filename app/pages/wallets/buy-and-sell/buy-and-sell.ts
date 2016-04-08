import { Page } from 'ionic-angular';
import { BuyPage } from './buy/buy';
import { SellPage } from './sell/sell';
import { RootNavigationProvider } from '../../../providers/providers';

@Page({
  templateUrl: 'build/pages/wallets/buy-and-sell/buy-and-sell.html'
})
export class BuyAndSellPage {
  constructor(public rootNav: RootNavigationProvider) {
  }
  buy(){
    this.rootNav.getRootNav().push(BuyPage);
  }
  sell(){
    this.rootNav.getRootNav().push(SellPage);
  }
}
