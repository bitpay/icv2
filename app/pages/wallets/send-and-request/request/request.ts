import { Page } from 'ionic-angular';
import { hideTabs, TabsProvider } from '../../../../providers/providers';

@hideTabs()
@Page({
  templateUrl: 'build/pages/wallets/send-and-request/request/request.html'
})
export class RequestPage {
  constructor(public tabsProvider: TabsProvider) {
  }
}
