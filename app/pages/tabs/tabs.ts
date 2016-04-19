import { IonicApp, Page } from 'ionic-angular';
import { ActivityPage, ScanPage, WalletsPage, PluginPage } from '../../pages/pages';
import { RootNavigationProvider } from '../../providers/providers';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  pluginTab = PluginPage;
  tab1Root = ActivityPage;
  tab2Root = ScanPage;
  tab3Root = WalletsPage;
  constructor(private app:IonicApp, private rootNav: RootNavigationProvider) {}
  ngAfterViewInit() {
    this.rootNav.setTabs(this.app.getComponent('rootTabs'));
    this.rootNav.setPluginTabIndex(0);
  }
}
