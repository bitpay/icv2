import { Page } from 'ionic-angular';
import { Profile, ProfileProvider } from '../../providers';
import { FeePolicy } from '../../components';

@Page({
  templateUrl: 'build/pages/profile-settings/profile-settings.html',
  directives: [FeePolicy]
})
export class ProfileSettingsPage {
  currentProfile: Profile;
  constructor(ProfileProvider: ProfileProvider) {
    ProfileProvider.currentProfile.subscribe((profile: Profile) => {
      this.currentProfile = profile;
      console.log(profile);
    });
  }
}
