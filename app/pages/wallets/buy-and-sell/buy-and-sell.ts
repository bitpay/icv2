import { Page } from 'ionic-angular';
import { BuyPage } from './buy/buy';
import { SellPage } from './sell/sell';

@Page({
  templateUrl: 'build/pages/wallets/buy-and-sell/buy-and-sell.html'
})
export class BuyAndSellPage {
  BuyPage = BuyPage;
  SellPage = SellPage;
}
