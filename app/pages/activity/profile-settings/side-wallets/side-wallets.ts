import { Page } from 'ionic-angular';
import { Profile, ProfileProvider } from '../../../../providers/providers';

@Page({
  templateUrl: 'build/pages/activity/profile-settings/side-wallets/side-wallets.html'
})
export class SideWalletsPage {
  currentProfile: Profile;
  constructor(ProfileProvider: ProfileProvider) {
    ProfileProvider.currentProfile.subscribe((profile: Profile) => {
      this.currentProfile = profile;
      console.log(profile);
    });
  }
}
