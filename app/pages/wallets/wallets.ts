import { Page } from 'ionic-angular';
import { PluginInstance } from '../../components/components';
import { SendAndRequestPage } from './send-and-request/send-and-request';
import { BuyAndSellPage } from './buy-and-sell/buy-and-sell';
import { RootNavigationProvider, ProfileProvider } from '../../providers/providers';

@Page({
  templateUrl: 'build/pages/wallets/wallets.html'
})
export class WalletsPage {
  plugins: PluginInstance[] = [];

  constructor(private rootNav: RootNavigationProvider, private profileProvider: ProfileProvider) {
    this.profileProvider.currentProfile.subscribe((profile)=>{
      this.plugins = profile.pluginInstances;
    });
  }

  buyAndSell(){
    this.rootNav.getRootNav().push(BuyAndSellPage);
  }
  sendAndRequest(){
    this.rootNav.getRootNav().push(SendAndRequestPage);
  }

  openPlugin(plugin: PluginInstance){
    this.rootNav.openPlugin(plugin);
  }

}
