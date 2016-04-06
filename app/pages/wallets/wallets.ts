import { Page } from 'ionic-angular';
import { PluginInstance } from '../../components';
import { SendAndRequestPage } from './send-and-request/send-and-request';

@Page({
  templateUrl: 'build/pages/wallets/wallets.html'
})
export class WalletsPage {
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
