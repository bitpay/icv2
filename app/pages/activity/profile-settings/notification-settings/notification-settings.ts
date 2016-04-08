import { Page } from 'ionic-angular';
import { Profile, ProfileProvider } from '../../../../providers/providers';

@Page({
  templateUrl: 'build/pages/activity/profile-settings/notification-settings/notification-settings.html'
})
export class NotificationSettingsPage {
  currentProfile: Profile;
  constructor(ProfileProvider: ProfileProvider) {
    ProfileProvider.currentProfile.subscribe((profile: Profile) => {
      this.currentProfile = profile;
      console.log(profile);
    });
  }
}
