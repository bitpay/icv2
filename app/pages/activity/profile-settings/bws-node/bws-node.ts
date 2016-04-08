import { Page } from 'ionic-angular';
import { Profile, ProfileProvider } from '../../../../providers/providers';

@Page({
  templateUrl: 'build/pages/activity/profile-settings/bws-node/bws-node.html'
})
export class BWSNodePage {
  currentProfile: Profile;
  constructor(ProfileProvider: ProfileProvider) {
    ProfileProvider.currentProfile.subscribe((profile: Profile) => {
      this.currentProfile = profile;
      console.log(profile);
    });
  }
}
