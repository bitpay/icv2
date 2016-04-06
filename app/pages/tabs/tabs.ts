import { Page } from 'ionic-angular';
import { ActivityPage, ScanPage, WalletsPage } from '../../pages/pages';
import { TabsProvider } from '../../providers/providers';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  tab1Root: any = ActivityPage;
  tab2Root: any = ScanPage;
  tab3Root: any = WalletsPage;

  currentState: boolean;

  constructor(TabsProvider: TabsProvider) {
    TabsProvider.currentState.subscribe((state: boolean) => {
      this.currentState = state;
    });
  }
}
