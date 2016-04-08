import { Page } from 'ionic-angular';
import { SendPage } from './send/send';
import { RequestPage } from './request/request';

@Page({
  templateUrl: 'build/pages/wallets/send-and-request/send-and-request.html'
})
export class SendAndRequestPage {
  SendPage = SendPage;
  RequestPage = RequestPage;
}
