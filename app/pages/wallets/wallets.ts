import { Page } from 'ionic-angular';
import { PluginInstance } from '../../components/components';
import { SendAndRequestPage } from './send-and-request/send-and-request';
import { BuyAndSellPage } from './buy-and-sell/buy-and-sell';

@Page({
  templateUrl: 'build/pages/wallets/wallets.html'
})
export class WalletsPage {
  BuyAndSellPage = BuyAndSellPage;
  SendAndRequestPage = SendAndRequestPage;

  plugins: PluginInstance[];

  constructor() {
    this.plugins = [
      new PluginInstance(),
      new PluginInstance(),
      new PluginInstance()
    ];
  }

}
