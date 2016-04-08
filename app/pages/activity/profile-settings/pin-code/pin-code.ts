import { Page } from 'ionic-angular';
import { Profile, ProfileProvider } from '../../../../providers/providers';

@Page({
  templateUrl: 'build/pages/activity/profile-settings/pin-code/pin-code.html'
})
export class PinCodePage {
  currentProfile: Profile;
  constructor(ProfileProvider: ProfileProvider) {
    ProfileProvider.currentProfile.subscribe((profile: Profile) => {
      this.currentProfile = profile;
      console.log(profile);
    });
  }
}
