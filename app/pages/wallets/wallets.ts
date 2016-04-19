import { Page } from 'ionic-angular';
import { PluginInstance } from '../../components/components';
import { SendAndRequestPage } from './send-and-request/send-and-request';
import { BuyAndSellPage } from './buy-and-sell/buy-and-sell';
import { RootNavigationProvider } from '../../providers/providers';

@Page({
  templateUrl: 'build/pages/wallets/wallets.html'
})
export class WalletsPage {
  plugins: PluginInstance[];

  constructor(public rootNav: RootNavigationProvider) {
    this.plugins = [
    ];
  }

  buyAndSell(){
    this.rootNav.getRootNav().push(BuyAndSellPage);
  }
  sendAndRequest(){
    this.rootNav.getRootNav().push(SendAndRequestPage);
  }

}
