import { Page } from 'ionic-angular';
import { Profile, ProfileProvider } from '../../../providers/providers';
import { FeePolicy } from '../../../components/components';

import { NotificationSettingsPage } from './notification-settings/notification-settings';

@Page({
  templateUrl: 'build/pages/activity/profile-settings/profile-settings.html',
  directives: [FeePolicy]
})
export class ProfileSettingsPage {
  NotificationSettingsPage = NotificationSettingsPage;


  currentProfile: Profile;
  constructor(ProfileProvider: ProfileProvider) {
    ProfileProvider.currentProfile.subscribe((profile: Profile) => {
      this.currentProfile = profile;
      console.log(profile);
    });
  }
}
