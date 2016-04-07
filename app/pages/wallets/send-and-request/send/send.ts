import {Page} from 'ionic-angular';
import { hideTabs, TabsProvider } from '../../../../providers/providers';

@hideTabs()
@Page({
  templateUrl: 'build/pages/wallets/send-and-request/send/send.html'
})
export class SendPage {
  constructor(public tabsProvider: TabsProvider) {
  }
}
