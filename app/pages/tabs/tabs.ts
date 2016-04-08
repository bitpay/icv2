import { Page } from 'ionic-angular';
import { ActivityPage, ScanPage, WalletsPage } from '../../pages/pages';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  tab1Root: any = ActivityPage;
  tab2Root: any = ScanPage;
  tab3Root: any = WalletsPage;
}
