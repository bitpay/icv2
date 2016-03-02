import {Page} from 'ionic-framework/ionic';

import {ActivityPage} from '../activity/activity';
import {ScanPage} from '../scan/scan';
import {WalletsPage} from '../wallets/wallets';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  tab1Root: any = ActivityPage;
  tab2Root: any = ScanPage;
  tab3Root: any = WalletsPage;

  constructor() {
    console.log('TabsPage constructor called.');
  }
}
