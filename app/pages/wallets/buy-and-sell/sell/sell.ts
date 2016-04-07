import { Page } from 'ionic-angular';
import { hideTabs, TabsProvider } from '../../../../providers/providers';

@hideTabs()
@Page({
  templateUrl: 'build/pages/wallets/buy-and-sell/sell/sell.html'
})
export class SellPage {
  constructor(public tabsProvider: TabsProvider) {
  }
}
