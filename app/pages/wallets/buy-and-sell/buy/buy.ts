import { Page } from 'ionic-angular';
import { hideTabs, TabsProvider } from '../../../../providers/providers';

@hideTabs()
@Page({
  templateUrl: 'build/pages/wallets/buy-and-sell/buy/buy.html'
})
export class BuyPage {
  constructor(public tabsProvider: TabsProvider) {
  }
}
