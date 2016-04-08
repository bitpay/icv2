import { Page } from 'ionic-angular';
import { Profile, ProfileProvider } from '../../../providers/providers';
import { FeePolicy } from '../../../components/components';

import { FeedbackPage } from './feedback/feedback';
import { NotificationSettingsPage } from './notifications/notifications';
import { ExchangesPage } from './exchanges/exchanges';
import { AddressBookPage } from './address-book/address-book';
import { PinCodePage } from './pin-code/pin-code';
import { PasswordPage } from './password/password';
import { FingerprintPage } from './fingerprint/fingerprint';
import { BackupsPage } from './backups/backups';
import { BWSNodePage } from './bws-node/bws-node';
import { SideWalletsPage } from './side-wallets/side-wallets';
import { ArchivedWalletsPage } from './archived-wallets/archived-wallets';

@Page({
  templateUrl: 'build/pages/activity/profile-settings/profile-settings.html',
  directives: [FeePolicy]
})
export class ProfileSettingsPage {
  FeedbackPage = FeedbackPage;
  NotificationSettingsPage = NotificationSettingsPage;
  ExchangesPage = ExchangesPage;
  AddressBookPage = AddressBookPage;
  PinCodePage = PinCodePage;
  PasswordPage = PasswordPage;
  FingerprintPage = FingerprintPage;
  BackupsPage = BackupsPage;
  BWSNodePage = BWSNodePage;
  SideWalletsPage = SideWalletsPage;
  ArchivedWalletsPage = ArchivedWalletsPage;

  currentProfile: Profile;
  constructor(ProfileProvider: ProfileProvider) {
    ProfileProvider.currentProfile.subscribe((profile: Profile) => {
      this.currentProfile = profile;
      console.log(profile);
    });
  }
}
