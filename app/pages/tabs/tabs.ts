import { Page } from 'ionic-angular';
import { ActivityPage, ScanPage, WalletsPage, PluginPage } from '../../pages/pages';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  pluginTab = PluginPage;
  tab1Root = ActivityPage;
  tab2Root = ScanPage;
  tab3Root = WalletsPage;
}
